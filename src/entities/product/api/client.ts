import type {
  IAdminProductsFilters,
  IAdminProductsPage,
  ICreateProductData,
  IProductWithRelations,
  IUpdateProductData,
  TAdminProductsSort,
} from "@/entities/product";
import { request } from "@/shared/api/http/request";

export function createProduct(payload: ICreateProductData) {
  return request<IProductWithRelations>(`/api/admin/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export function getAdminProducts(params?: {
  page?: number;
  limit?: number;
  sort?: TAdminProductsSort;
  filters?: IAdminProductsFilters;
}) {
  const sp = new URLSearchParams();

  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.sort) sp.set("sort", params.sort);

  const f = params?.filters;
  if (f?.q) sp.set("q", f.q);
  if (f?.categoryId !== undefined) sp.set("categoryId", String(f.categoryId));
  if (f?.typeId !== undefined) sp.set("typeId", String(f.typeId));
  if (f?.collectionId !== undefined) sp.set("collectionId", String(f.collectionId));

  if (f?.minPrice !== undefined) sp.set("minPrice", String(f.minPrice));
  if (f?.maxPrice !== undefined) sp.set("maxPrice", String(f.maxPrice));

  if (f?.createdFrom) sp.set("createdFrom", f.createdFrom.toISOString());
  if (f?.createdTo) sp.set("createdTo", f.createdTo.toISOString());

  const qs = sp.toString();
  return request<IAdminProductsPage>(`/api/admin/products/filter${qs ? `?${qs}` : ""}`, { method: "GET" });
}
export function patchProduct(id: number, payload: Partial<IUpdateProductData>) {
  return request<IProductWithRelations>(`/api/admin/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id: number) {
  return request(`/api/admin/products/${id}`, {
    method: "DELETE",
  });
}
