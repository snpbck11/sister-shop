import { IUpdateCategoryData } from "@/entities/category";
import { updateCollectionSchema } from "@/entities/collection";
import slugify from "@sindresorhus/slugify";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "../../cache/tags";
import { updateCollection } from "../../db";
import { parseOrFail } from "../../lib";

export async function patchCollectionService(id: number, body: unknown) {
  const parsed = parseOrFail(updateCollectionSchema, { id, ...(body as object) });

  if (!parsed.success) return parsed;

  const next: IUpdateCategoryData = {
    ...parsed.data,
    ...(parsed.data.name !== undefined ? { slug: slugify(parsed.data.name) } : {}),
  };

  const updated = await updateCollection(next);

  revalidateTag(CACHE_TAGS.collections, "default");
  
  return { success: true, data: updated };
}
