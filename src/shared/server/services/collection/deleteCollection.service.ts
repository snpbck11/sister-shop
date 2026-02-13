import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { deleteCollectionById, getCollectionImage } from "../../db";
import { removeImagesByUrls } from "../../storage/image";

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

  revalidateTag(CACHE_TAGS.collections, "default");

  return { success: true, data: undefined };
}
