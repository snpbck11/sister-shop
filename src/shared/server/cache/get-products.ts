import { unstable_cache } from "next/cache";
import { CACHE_KEYS, CACHE_TAGS } from "./tags";
import { getPopularProducts } from "../db";

export const getCachedProducts = unstable_cache(getPopularProducts, CACHE_KEYS.products, {
  tags: [CACHE_TAGS.products],
  revalidate: 3600,
});
