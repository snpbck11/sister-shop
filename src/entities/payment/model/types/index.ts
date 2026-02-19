export interface IStartPaymentResult {
  paymentId: string;
  confirmationUrl: string;
}

export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCEEDED: "succeeded",
  CANCELED: "canceled",
  REFUNDED: "refunded",
} as const;

export const PAYMENT_PROVIDER = {
  YOOKASSA: "yookassa",
} as const;

export type TPaymentType = (typeof PAYMENT_PROVIDER)[keyof typeof PAYMENT_PROVIDER];
export type TPaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface ICreatePaymentData {
  orderId: string;
  provider: TPaymentType;
  status: TPaymentStatus;
  currency: "RUB";
  amount: number;
  idempotenceKey: string;
}

export interface IUpdatePaymentData {
  status?: TPaymentStatus;
  externalPaymentId?: string;
  confirmationUrl?: string;
  rawCreateResponse?: string;
  rawLastWebhook?: string;
}
