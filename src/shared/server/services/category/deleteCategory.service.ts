import { deleteCategory } from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { getCategoryImage } from "../../db";
import { removeImagesByUrls } from "../../storage/image";

export async function deleteCategoryService(id: number): Promise<ApiResponse<void>> {
  const url = await getCategoryImage(id);
  if (!url) return { success: false, error: "Категория не найдена" };

  try {
    await removeImagesByUrls([url]);
  } catch (e) {
    console.error("Ошибка при удалении категории:", id, e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Не удалось удалить категориюF",
    };
  }

  await deleteCategory(id);

  revalidateTag(CACHE_TAGS.categories, "default");

  return { success: true, data: undefined };
}
