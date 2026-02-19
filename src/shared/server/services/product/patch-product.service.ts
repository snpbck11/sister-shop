import { IProductWithRelations, IUpdateProductData, updateProductSchema } from "@/entities/product";
import { ApiResponse } from "@/shared/api/http/types";
import slugify from "@sindresorhus/slugify";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { updateProduct } from "../../db";
import { parseOrFail } from "../../lib";

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
