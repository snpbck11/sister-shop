import { ORDER_STATUS } from "@/entities/order";
import { PAYMENT_STATUS, TYookassaWebhookEvent, YOOKASSA_PAYMENT_STATUS } from "@/entities/payment";
import { prisma } from "@/shared/server/prisma";
import type { Prisma } from "@prisma/client";

export async function applyYookassaWebhook(params: {
  event: TYookassaWebhookEvent;
  externalPaymentId: string;
  metadataPaymentId?: string;
  rawWebhook: unknown;
}): Promise<
  | { ok: true; processed: true }
  | { ok: true; processed: false; reason: (typeof YOOKASSA_PAYMENT_STATUS)["PAYMENT_NOT_FOUND"] }
> {
  const { event, externalPaymentId, metadataPaymentId, rawWebhook } = params;

  const payment = metadataPaymentId
    ? await prisma.payment.findUnique({ where: { id: metadataPaymentId } })
    : await prisma.payment.findFirst({ where: { externalPaymentId } });

  if (!payment) {
    return { ok: true, processed: false, reason: YOOKASSA_PAYMENT_STATUS.PAYMENT_NOT_FOUND };
  }

  console.log(event);

  if (event === YOOKASSA_PAYMENT_STATUS.PAYMENT_SUCCEEDED) {
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: PAYMENT_STATUS.SUCCEEDED,
          externalPaymentId: payment.externalPaymentId ?? externalPaymentId,
          rawLastWebhook: rawWebhook as Prisma.InputJsonValue,
        },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: ORDER_STATUS.PAID },
      });
    });

    return { ok: true, processed: true };
  }

  if (event === YOOKASSA_PAYMENT_STATUS.PAYMENT_CANCELED) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PAYMENT_STATUS.CANCELED,
        externalPaymentId: payment.externalPaymentId ?? externalPaymentId,
        rawLastWebhook: rawWebhook as Prisma.InputJsonValue,
      },
    });

    return { ok: true, processed: true };
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: { rawLastWebhook: rawWebhook as Prisma.InputJsonValue },
  });

  return { ok: true, processed: true };
}
