import { ICollectionPage } from "@/entities/collection";
import type { ApiResponse } from "@/shared/api/http/types";
import { getCollectionBySlug, getProductsByCursorFilter } from "../../db";

export async function getCollectionPageBySlug(params: {
  slug: string;
  cursor?: string | null;
  limit?: number;
}): Promise<ApiResponse<ICollectionPage>> {
  const { slug, cursor, limit = 24 } = params;

  const collection = await getCollectionBySlug(slug);
  if (!collection) {
    return { success: false, error: "Коллекция не найдена" };
  }

  const products = await getProductsByCursorFilter({
    categorySlug: slug,
    cursor,
    limit,
  });

  return {
    success: true,
    data: {
      collection,
      products,
    },
  };
}
