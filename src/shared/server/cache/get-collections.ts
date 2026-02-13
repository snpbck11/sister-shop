import { unstable_cache } from "next/cache";
import { getCollections } from "../db";
import { CACHE_KEYS, CACHE_TAGS } from "./tags";

export const getCachedCollections = unstable_cache(getCollections, CACHE_KEYS.collections, {
  tags: [CACHE_TAGS.collections],
  revalidate: 3600,
});
