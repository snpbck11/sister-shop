import { type IProductWithRelations, type IUpdateProductData } from "@/entities/product";
import { createProductSchema, updateProductSchema } from "@/entities/product/model/schema";
import { ApiResponse } from "@/shared/api/http/types";
import {
  deleteProductById,
  getProductImageUrls,
  insertProduct,
  updateProduct,
} from "@/shared/server/db/repos/product/product.repo";
import { parseOrFail } from "@/shared/server/lib";
import slugify from "@sindresorhus/slugify";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { removeImagesByUrls } from "../../storage/image";

export async function createProductService(
  body: unknown,
): Promise<ApiResponse<IProductWithRelations>> {
  const parsed = parseOrFail(createProductSchema, body);

  if (!parsed.success) return parsed;

  const product = await insertProduct(parsed.data);

  revalidateTag(CACHE_TAGS.products, "default");

  return { success: true, data: product };
}

export async function patchProductService(
  id: number,
  body: unknown,
): Promise<ApiResponse<IProductWithRelations>> {
  const parsed = parseOrFail(updateProductSchema, { id, ...(body as object) });
  if (!parsed.success) return parsed;

  const next: IUpdateProductData = {
    ...parsed.data,
    ...(parsed.data.title !== undefined ? { slug: slugify(parsed.data.title) } : {}),
  };

  const updated = await updateProduct(next);

  revalidateTag(CACHE_TAGS.products, "default");

  return { success: true, data: updated };
}

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
