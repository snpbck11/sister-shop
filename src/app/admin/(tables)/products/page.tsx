import { ProductsTable } from "@/features/manage-products";
import { getCategories, getCollections, getProductTypes } from "@/shared/server/db";
import { getAdminProductsPage } from "@/shared/server/db/repos/product";

export default async function AdminProductsPage() {
  const [productsPage, collections, categories, types] = await Promise.all([
    getAdminProductsPage({page: 1, limit: 4}),
    getCollections(),
    getCategories(),
    getProductTypes(),
  ]);

  return (
    <ProductsTable
      initialPage={productsPage}
      collections={collections}
      categories={categories}
      types={types}
    />
  );
}
