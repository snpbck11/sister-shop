import { ICategoryPage } from "@/entities/category";
import type { ApiResponse } from "@/shared/api/http/types";
import { getCategoryBySlug, getProductsByCursorFilter } from "../../db";


export async function getCategoryPageBySlugService(params: {
  slug: string;
  cursor?: string | null;
  limit?: number;
}): Promise<ApiResponse<ICategoryPage>> {
  const { slug, cursor, limit = 24 } = params;

  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { success: false, error: "Категория не найдена" };
  }

  const products = await getProductsByCursorFilter({
    categorySlug: slug,
    cursor,
    limit,
  });

  return {
    success: true,
    data: {
      category,
      products,
    },
  };
}
