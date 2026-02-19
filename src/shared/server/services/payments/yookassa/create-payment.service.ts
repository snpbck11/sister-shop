import { ORDER_STATUS } from "@/entities/order";
import {
  ICreatePaymentData,
  IStartPaymentResult,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "@/entities/payment";
import type { ApiResponse } from "@/shared/api/http/types";
import { findOrderById } from "@/shared/server/db/repos/order";
import { insertPayment, updatePayment } from "@/shared/server/db/repos/payment";
import { parseOrFail } from "@/shared/server/lib";
import { startPaymentSchema } from "@/shared/validation";
import { randomUUID } from "crypto";

function rubToString(value: number): string {
  return value.toFixed(2);
}

export async function startPaymentForOrderService(
  body: unknown,
): Promise<ApiResponse<IStartPaymentResult>> {
  const parsed = parseOrFail(startPaymentSchema, body);

  if (!parsed.success) return parsed;

  const { orderId } = parsed.data;

  const shopId = process.env.SHOP_ID;
  const secretKey = process.env.SHOP_SECRET_KEY;
  const returnUrl = `${process.env.PAYMENT_RETURN_URL}?orderId=${orderId}`;

  if (!shopId || !secretKey || !returnUrl) {
    return { success: false, error: "Не настроены SHOP_ID / SECRET_KEY / PAYMENT_RETURN_URL" };
  }

  const order = await findOrderById(orderId);

  if (!order) return { success: false, error: "Заказ не найден" };
  if (order.status !== ORDER_STATUS.PENDING_PAYMENT) {
    return { success: false, error: `Нельзя оплатить заказ в статусе: ${order.status}` };
  }

  const idempotenceKey = randomUUID();

  const createPaymentData: ICreatePaymentData = {
    orderId: order.id,
    provider: PAYMENT_PROVIDER.YOOKASSA,
    status: PAYMENT_STATUS.PENDING,
    currency: "RUB",
    amount: order.amountTotal,
    idempotenceKey,
  };

  const payment = await insertPayment(createPaymentData);

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString("base64");

  const resp = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
      "Idempotence-Key": payment.idempotenceKey,
    },
    body: JSON.stringify({
      amount: {
        value: rubToString(payment.amount),
        currency: payment.currency,
      },
      confirmation: {
        type: "redirect",
        return_url: returnUrl,
      },
      capture: true,
      description: `Заказ ${order.id}`,
      metadata: {
        orderId: order.id,
        paymentId: payment.id,
      },
    }),
  });

  const rawCreateResponse = await resp.json();

  if (!resp.ok) {
    await updatePayment(payment.id, { status: PAYMENT_STATUS.CANCELED, rawCreateResponse });

    const msg =
      rawCreateResponse?.description ||
      rawCreateResponse?.message ||
      rawCreateResponse?.error?.description ||
      "Ошибка ЮKassa";
    return { success: false, error: msg };
  }

  const confirmationUrl: string | undefined = rawCreateResponse?.confirmation?.confirmation_url;
  const externalPaymentId: string | undefined = rawCreateResponse?.id;

  if (!confirmationUrl || !externalPaymentId) {
    await updatePayment(payment.id, { rawCreateResponse });
    return { success: false, error: "ЮKassa не вернула ссылку на оплату" };
  }
  await updatePayment(payment.id, {
    externalPaymentId,
    confirmationUrl,
    rawCreateResponse,
  });

  return { success: true, data: { paymentId: payment.id, confirmationUrl } };
}
