import { request } from "@/shared/api/http/request";
import { ICategoryWithCount, ICreateCategoryDTO, IUpdateCategoryData } from "../model/types";
import { ICategoryPage } from "../model/types/storefront";

export function createCategory(payload: ICreateCategoryDTO) {
  return request<ICategoryWithCount>(`/api/admin/categories`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProductsByCategorySlug(
  slug: string,
  params?: { cursor?: string | null; limit?: number },
) {
  const sp = new URLSearchParams();
  if (params?.cursor) sp.set("cursor", params.cursor);
  if (params?.limit !== undefined) sp.set("limit", String(params.limit));
  const qs = sp.toString();

  return request<ICategoryPage>(`/api/categories/${slug}${qs ? `?${qs}` : ""}`);
}

export function patchCategory(id: number, payload: Partial<IUpdateCategoryData>) {
  return request<ICategoryWithCount>(`/api/admin/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteCategory(id: number) {
  return request(`/api/admin/categories/${id}`, {
    method: "DELETE",
  });
}
