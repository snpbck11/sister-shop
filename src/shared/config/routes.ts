export const ROUTES = {
  home: "/",
  collections: {
    allDesigns: "/collections/all-designs",
    bestSellers: "/collections/bestsellers",
  },
  products: {
    bySlug: (slug: string) => `/products/${slug}`,
  },
} as const;
