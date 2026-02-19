export const YOOKASSA_PAYMENT_STATUS = {
  PAYMENT_NOT_FOUND: "payment_not_found",
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_CANCELED: "payment.canceled",
} as const;

export type TYookassaWebhookEvent =
  | (typeof YOOKASSA_PAYMENT_STATUS)[keyof typeof YOOKASSA_PAYMENT_STATUS]
  | string;

export interface IYookassaWebhookBody {
  event?: string;
  object?: {
    id?: string;
    metadata?: {
      paymentId?: string;
    };
  };
}
