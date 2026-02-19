import { request } from "@/shared/api/http/request";
import { ICreateOrderInput, ICreateOrderResult, IOrderWithDetails } from "../model/types";

export function createOrder(payload: ICreateOrderInput) {
  return request<ICreateOrderResult>(`/api/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getOrderById(orderId: string) {
  return request<IOrderWithDetails>(`/api/orders/${orderId}`, { cache: "no-store" });
}
