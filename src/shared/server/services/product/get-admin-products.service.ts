import type {
  IAdminProductsFilters,
  IAdminProductsPage,
  TAdminProductsSort,
} from "@/entities/product";
import type { ApiResponse } from "@/shared/api/http/types";
import { getAdminProductsPage } from "@/shared/server/db/repos/product/product.repo.admin";

export async function getAdminProductsPageService(input: {
  page?: number;
  limit?: number;
  sort?: TAdminProductsSort;
  filters?: IAdminProductsFilters;
}): Promise<ApiResponse<IAdminProductsPage>> {
  const data = await getAdminProductsPage(input);

  if (!data) return { success: false, error: "Ошибка при запросе товаров" };

  return { success: true, data };
}
