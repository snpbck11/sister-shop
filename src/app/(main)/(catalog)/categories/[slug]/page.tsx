import { getCategoryWithProducts, getProductTypes } from "@/shared/server/db";
import { ProductsListing } from "@/widgets/ProductsListing";

export default async function CategoriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [categoriesWithProducts, types] = await Promise.all([
    getCategoryWithProducts(slug),
    getProductTypes(),
  ]);

  if (!categoriesWithProducts) {
    return <p className="text-center w-full mt-12">Товары по категории не найдены</p>;
  }

  const { category, products } = categoriesWithProducts;

  return (
    <ProductsListing
      title={category.name}
      description={category.description}
      types={types}
      products={products}
    />
  );
}
