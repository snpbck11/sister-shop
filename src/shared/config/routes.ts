export const ROUTES = {
  home: "/",
  collections: {
    main: "/collections",
    allDesigns: "/collections/vse-tovary",
    bestSellers: "/collections/bestsellery",
  },
  categories: { main: "/categories" },
  products: {
    bySlug: (slug: string) => `/products/${slug}`,
  },
} as const;
