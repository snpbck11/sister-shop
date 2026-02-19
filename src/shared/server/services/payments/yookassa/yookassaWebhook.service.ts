import { IYookassaWebhookBody } from "@/entities/payment";
import type { ApiResponse } from "@/shared/api/http/types";
import { applyYookassaWebhook } from "@/shared/server/db/repos/payment";

export async function handleYookassaWebhookService(body: unknown): Promise<ApiResponse<true>> {
  const b = body as IYookassaWebhookBody;

  const event = b?.event;
  const externalPaymentId = b?.object?.id;
  const metadataPaymentId = b?.object?.metadata?.paymentId;

  if (!event || !externalPaymentId) {
    return { success: false, error: "Неверные данные webhook" };
  }

  await applyYookassaWebhook({
    event,
    externalPaymentId,
    metadataPaymentId,
    rawWebhook: body,
  });

  return { success: true, data: true };
}
