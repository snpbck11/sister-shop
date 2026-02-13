import { ICategory, IUpdateCategoryData, updateCategorySchema } from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import slugify from "@sindresorhus/slugify";
import { updateCategory } from "../../db";
import { parseOrFail } from "../../lib";

export async function patchCategoryService(
  id: number,
  body: unknown,
): Promise<ApiResponse<ICategory>> {
  const parsed = parseOrFail(updateCategorySchema, { id, ...(body as object) });

  if (!parsed.success) return parsed;

  const next: IUpdateCategoryData = {
    ...parsed.data,
    ...(parsed.data.name !== undefined ? { slug: slugify(parsed.data.name) } : {}),
  };

  const updated = await updateCategory(next);
  return { success: true, data: updated };
}
