import { ICreateOrderResult } from "@/entities/order";
import { request } from "@/shared/api/http/request";
import { IStartPaymentResult } from "../model/types";

export function createPayment(payload: ICreateOrderResult) {
  return request<IStartPaymentResult>(`/api/payments/yookassa/create`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
