"use client";

import { getProductsByCollectionSlug } from "@/entities/collection";
import { IStorefrontProductsPage } from "@/entities/product";
import { IProductType } from "@/entities/product-type";
import { ProductsListing } from "@/widgets/ProductsListing";

type IProductsListingCollectionProps = {
  title: string;
  description?: string;
  types: IProductType[];
  slug: string;
  initial: IStorefrontProductsPage;
};

export function ProductsListingCollection({
  title,
  description,
  initial,
  types,
  slug,
}: IProductsListingCollectionProps) {
  const makeCollectionLoadMore = (slug: string) => async (cursor: string) => {
    const res = await getProductsByCollectionSlug(slug, { cursor });
    if (!res.success) return res;
    return { success: res.success, data: res.data.products };
  };

  return (
    <ProductsListing
      title={title}
      description={description}
      types={types}
      initial={initial}
      loadMore={makeCollectionLoadMore(slug)}
    />
  );
}
