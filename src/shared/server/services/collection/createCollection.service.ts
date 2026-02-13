import { ICategory } from "@/entities/category";
import { createCollectionSchema } from "@/entities/collection";
import { ApiResponse } from "@/shared/api/http/types";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { insertCollection } from "../../db";
import { parseOrFail } from "../../lib";

export async function createCollectionService(body: unknown): Promise<ApiResponse<ICategory>> {
  const parsed = parseOrFail(createCollectionSchema, body);
  if (!parsed.success) return parsed;

  const collection = await insertCollection(parsed.data);

  revalidateTag(CACHE_TAGS.collections, "default");

  return { success: true, data: collection };
}
