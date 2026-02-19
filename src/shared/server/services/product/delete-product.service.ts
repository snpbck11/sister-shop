import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { getProductImageUrls, deleteProductById } from "../../db";
import { removeImagesByUrls } from "../../storage/image";

export async function deleteProductService(id: number): Promise<ApiResponse<void>> {
  const urls = await getProductImageUrls(id);
  if (urls.length === 0) return { success: false, error: "Товар не найден" };

  try {
    await removeImagesByUrls(urls);
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Не удалось удалить изображения",
    };
  }

  await deleteProductById(id);

  revalidateTag(CACHE_TAGS.products, "default");

  return { success: true, data: undefined };
}
