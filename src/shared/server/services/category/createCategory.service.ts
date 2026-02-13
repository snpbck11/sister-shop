import { createCategorySchema, ICategoryWithCount } from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { insertCategory } from "../../db";
import { parseOrFail } from "../../lib";

export async function createCategoryService(
  body: unknown,
): Promise<ApiResponse<ICategoryWithCount>> {
  const parsed = parseOrFail(createCategorySchema, body);
  if (!parsed.success) return parsed;

  const category = await insertCategory(parsed.data);

  revalidateTag(CACHE_TAGS.categories, "default");

  return { success: true, data: category };
}
