import { request } from "@/shared/api/http/request";
import { ICollectionWithCount, ICreateCollecionDTO, IUpdateCollectionData } from "../model/types";
import { ICollectionPage } from "../model/types/storefront";

export function createCollection(payload: ICreateCollecionDTO) {
  return request<ICollectionWithCount>(`/api/admin/collections`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProductsByCollectionSlug(
  slug: string,
  params?: { cursor?: string | null; limit?: number },
) {
  const sp = new URLSearchParams();
  if (params?.cursor) sp.set("cursor", params.cursor);
  if (params?.limit !== undefined) sp.set("limit", String(params.limit));
  const qs = sp.toString();

  return request<ICollectionPage>(`/api/collections/${slug}${qs ? `?${qs}` : ""}`);
}

export function patchCollection(id: number, payload: Partial<IUpdateCollectionData>) {
  return request<ICollectionWithCount>(`/api/admin/collections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteCollection(id: number) {
  return request(`/api/admin/collections/${id}`, {
    method: "DELETE",
  });
}
