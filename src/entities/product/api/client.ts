import type { IProductWithRelations } from "@/entities/product";
import type { ICreateProductData, IUpdateProductData } from "@/entities/product/model/types";
import { request } from "@/shared/api/http/request";

export function createProduct(payload: ICreateProductData) {
  return request<IProductWithRelations>(`/api/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function patchProduct(id: number, payload: Partial<IUpdateProductData>) {
  return request<IProductWithRelations>(`/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id: number) {
  return request(`/api/products/${id}`, {
    method: "DELETE",
  });
}
