export const DELIVERY_TYPE = {
  PICKUP: "pickup",
  COURIER: "courier",
  POST: "post",
} as const;

export const ORDER_STATUS = {
  PENDING_PAYMENT: "pending_payment",
  PAID: "paid",
  CANCELED: "canceled",
  FULFILLED: "fulfilled",
  REFUNDED: "refunded",
} as const;

export const PAYMENT_METHOD = {
  CARD: "CARD",
  // SBP: "SBP",
} as const;

export type TDeliveryType = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

export type TOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type TPaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export interface IOrderWithDetails {
  id: string;
  status: string;
  currency: string;
  amountTotal: number;
  customerName: string | null;
  phone: string | null;
  email: string | null;
  deliveryType: string | null;
  addressLine: string | null;
  city: string | null;
  postalCode: string | null;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    productId: number;
    productSlug: string;
    title: string;
    image: string;
    sizeId: number;
    sizeName: string;
    qty: number;
    priceEach: number;
    amountLine: number;
  }>;
  lastPayment: null | {
    id: string;
    status: string;
    provider: string;
    amount: number;
    currency: string;
    createdAt: string;
  };
}

export interface IOrderItemInput {
  sizeId: number;
  qty: number;
}

export interface ICreateOrderInput {
  items: IOrderItemInput[];
  customerName?: string;
  email?: string;
  phone?: string;
  deliveryType?: TDeliveryType;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  comment?: string;
}

export interface ICreateOrderResult {
  orderId: string;
}

export interface ICreateOrderWithItemsParams {
  amountTotal: number;
  currency?: string;
  customerName: string;
  phone: string;
  email?: string | null;
  deliveryType: TDeliveryType;
  addressLine?: string | null;
  city?: string | null;
  postalCode?: string | null;
  comment?: string | null;
  items: Array<{
    productId: number;
    sizeId: number;
    qty: number;
    priceEach: number;
    amountLine: number;
    titleSnapshot?: string | null;
    sizeNameSnapshot?: string | null;
  }>;
}
