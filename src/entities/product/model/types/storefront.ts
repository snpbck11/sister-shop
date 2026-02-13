export interface IStorefrontProductCard {
  id: number;
  slug: string;
  title: string;
  image: string;
  typeId: number;
  hoverImage: string;
  priceFrom: number;
}

export interface IStorefrontProductsPage {
  items: IStorefrontProductCard[];
  nextCursor: string | null;
  total: number;
}

export interface ICursorFilterParams {
  limit?: number;
  cursor?: string | null;
  categorySlug?: string;
  collectionSlug?: string;
}
