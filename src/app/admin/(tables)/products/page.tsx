import { ProductsTable } from "@/features/manage-products";
import { getCategories, getCollections, getProducts, getProductTypes } from "@/shared/server/db";

export default async function AdminProductsPage() {
  const [products, collections, categories, types] = await Promise.all([
    getProducts(),
    getCollections(),
    getCategories(),
    getProductTypes(),
  ]);

  return (
    <ProductsTable
      initialProducts={products}
      collections={collections}
      categories={categories}
      types={types}
    />
  );
}
