import { unstable_cache } from "next/cache";
import { getCategories } from "../db";
import { CACHE_KEYS, CACHE_TAGS } from "./tags";

export const getCachedCategories = unstable_cache(getCategories, CACHE_KEYS.categories, {
  tags: [CACHE_TAGS.categories],
  revalidate: 3600,
});
