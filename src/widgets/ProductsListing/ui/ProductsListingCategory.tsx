"use client";

import { getProductsByCategorySlug } from "@/entities/category";
import { IStorefrontProductsPage } from "@/entities/product";
import { IProductType } from "@/entities/product-type";
import { ProductsListing } from "@/widgets/ProductsListing";

type IProductsListingCategoryProps = {
  title: string;
  description?: string;
  types: IProductType[];
  slug: string;
  initial: IStorefrontProductsPage;
};

export function ProductsListingCategory({
  title,
  description,
  initial,
  types,
  slug,
}: IProductsListingCategoryProps) {
  const makeCategoryLoadMore = (slug: string) => async (cursor: string) => {
    const res = await getProductsByCategorySlug(slug, { cursor });
    if (!res.success) return res;
    return { success: res.success, data: res.data.products };
  };

  return (
    <ProductsListing
      title={title}
      description={description}
      types={types}
      initial={initial}
      loadMore={makeCategoryLoadMore(slug)}
    />
  );
}
