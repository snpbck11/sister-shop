import { ICategory, IUpdateCategoryData } from "@/entities/category";
import { createCollectionSchema, updateCollectionSchema } from "@/entities/collection";
import { ApiResponse } from "@/shared/api/http/types";
import slugify from "@sindresorhus/slugify";
import {
  deleteCollectionById,
  getCollectionImage,
  insertCollection,
  updateCollection,
} from "../db";
import { parseOrFail } from "../lib";
import { removeImagesByUrls } from "../storage/image";

export async function createCollectionService(body: unknown): Promise<ApiResponse<ICategory>> {
  const parsed = parseOrFail(createCollectionSchema, body);
  if (!parsed.success) return parsed;

  const next = {
    ...parsed.data,
    slug: slugify(parsed.data.name),
  };

  const collection = await insertCollection(next);
  return { success: true, data: collection };
}

export async function patchCollectionService(id: number, body: unknown) {
  const parsed = parseOrFail(updateCollectionSchema, { id, ...(body as object) });

  if (!parsed.success) return parsed;

  const next: IUpdateCategoryData = {
    ...parsed.data,
    ...(parsed.data.name !== undefined ? { slug: slugify(parsed.data.name) } : {}),
  };

  const updated = await updateCollection(next);
  return { success: true, data: updated };
}

export async function deleteCollectionService(id: number): Promise<ApiResponse<void>> {
  const url = await getCollectionImage(id);
  if (!url) return { success: false, error: "Коллекция не найдена" };

  try {
    await removeImagesByUrls([url]);
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Не удалось удалить изображение коллекции",
    };
  }

  await deleteCollectionById(id);

  return { success: true, data: undefined };
}
