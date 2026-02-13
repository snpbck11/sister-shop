import { getProductTypes } from "@/shared/server/db";
import { getCollectionPageBySlug } from "@/shared/server/services/collection";
import { ProductsListingCollection } from "@/widgets/ProductsListing";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [collectionWithProducts, types] = await Promise.all([
    getCollectionPageBySlug({ slug }),
    getProductTypes(),
  ]);

  if (!collectionWithProducts.success) {
    return <p className="text-center w-full mt-12">Коллекция не найдена</p>;
  }

  const { collection, products } = collectionWithProducts.data;

  return (
    <ProductsListingCollection
      title={collection.name}
      description={collection.description}
      types={types}
      initial={products}
      slug={slug}
    />
  );
}
