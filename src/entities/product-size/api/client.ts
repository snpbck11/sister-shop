import { request } from "@/shared/api/http/request";
import { IUpdateProductSize } from "../model/types";

export function patchProductSize(id: number, payload: Partial<IUpdateProductSize>) {
  return request(`/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id: number) {
  return request(`/api/products/${id}`, {
    method: "DELETE",
  });
}
