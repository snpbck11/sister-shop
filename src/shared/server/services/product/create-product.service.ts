import { IProductWithRelations, createProductSchema } from "@/entities/product";
import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { insertProduct } from "../../db";
import { parseOrFail } from "../../lib";

export async function createProductService(
  body: unknown,
): Promise<ApiResponse<IProductWithRelations>> {
  const parsed = parseOrFail(createProductSchema, body);

  if (!parsed.success) return parsed;

  const product = await insertProduct(parsed.data);

  revalidateTag(CACHE_TAGS.products, "default");

  return { success: true, data: product };
}
