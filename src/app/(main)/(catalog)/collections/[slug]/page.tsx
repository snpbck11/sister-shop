import { getCollectionWithProducts, getProductTypes } from "@/shared/server/db";
import { ProductsListing } from "@/widgets/ProductsListing";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [collectionWithProducts, types] = await Promise.all([
    getCollectionWithProducts(slug),
    getProductTypes(),
  ]);

  if (!collectionWithProducts) {
    return <p className="text-center w-full mt-12">Коллекция не найдена</p>;
  }

  const { collection, products } = collectionWithProducts;

  return (
    <ProductsListing
      title={collection.name}
      description={collection.description}
      types={types}
      products={products}
    />
  );
}
