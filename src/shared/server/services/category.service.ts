import {
  createCategorySchema,
  ICategory,
  ICategoryWithCount,
  IUpdateCategoryData,
  updateCategorySchema
} from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import slugify from "@sindresorhus/slugify";
import { deleteCategory, insertCategory, updateCategory } from "../db";
import { parseOrFail } from "../lib";

export async function createCategoryService(body: unknown): Promise<ApiResponse<ICategoryWithCount>> {
  const parsed = parseOrFail(createCategorySchema, body);
  if (!parsed.success) return parsed;

  const next = {
    ...parsed.data,
    slug: slugify(parsed.data.name),
  };

  const category = await insertCategory(next);
  return { success: true, data: category };
}

export async function patchCategoryService(id: number, body: unknown): Promise<ApiResponse<ICategory>> {
  const parsed = parseOrFail(updateCategorySchema, { id, ...(body as object) });

  if (!parsed.success) return parsed;

  const next: IUpdateCategoryData = {
    ...parsed.data,
    ...(parsed.data.name !== undefined ? { slug: slugify(parsed.data.name) } : {}),
  };

  const updated = await updateCategory(next);
  return { success: true, data: updated };
}

export async function deleteCategoryService(id: number): Promise<ApiResponse<void>> {
  try {
    await deleteCategory(id);
    return { success: true, data: undefined };
  } catch (e) {
    console.error("Ошибка при удалении категории:", id, e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Не удалось удалить категориюF",
    };
  }
}
