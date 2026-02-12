import { request } from "@/shared/api/http/request";
import { ICategoryWithCount, ICreateCategoryDTO, IUpdateCategoryData } from "../model/types";

export function createCategory(payload: ICreateCategoryDTO) {
  return request<ICategoryWithCount>(`/api/categories`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function patchCategory(id: number, payload: Partial<IUpdateCategoryData>) {
  return request<ICategoryWithCount>(`/api/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteCategory(id: number) {
  return request(`/api/categories/${id}`, {
    method: "DELETE",
  });
}
