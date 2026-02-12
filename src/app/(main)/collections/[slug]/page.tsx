import { getCollectionWithProducts, getProductTypes } from "@/shared/server/db";
import { ProductsGrid } from "@/widgets/ProductsGrid";

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
    <div className="p-2 pb-10 sm:p-5">
      <h2 className="text-sm text-center uppercase tracking-widest mb-2">{collection.name}</h2>

      {collection.description && (
        <p className="mb-4 text-center tracking-widest">{collection.description}</p>
      )}

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-12">В этой коллекции пока нет товаров</p>
      )}

      <ProductsGrid products={products} types={types} />
    </div>
  );
}
