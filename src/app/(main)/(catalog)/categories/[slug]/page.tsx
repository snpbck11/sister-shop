import { getProductTypes } from "@/shared/server/db";
import { getCategoryPageBySlugService } from "@/shared/server/services/category";
import { ProductsListingCategory } from "@/widgets/ProductsListing/ui/ProductsListingCategory";

export default async function CategoriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [categoriesWithProducts, types] = await Promise.all([
    getCategoryPageBySlugService({ slug }),
    getProductTypes(),
  ]);

  if (!categoriesWithProducts.success) {
    return <p className="text-center w-full mt-12">Товары по категории не найдены</p>;
  }

  const { category, products } = categoriesWithProducts.data;

  return (
    <ProductsListingCategory
      title={category.name}
      description={category.description}
      types={types}
      initial={products}
      slug={slug}
    />
  );
}
