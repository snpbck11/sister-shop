import { getProductBySlug, getRecommendedProducts, ProductGallery } from "@/entities/product";
import { AddToCartForm } from "@/features/add-to-cart";
import { ProductsCarousel } from "@/widgets/ProductsCarousel";
import { ProductTabs } from "@/widgets/ProductTabs";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const recommendedProducts = await getRecommendedProducts(product?.id);

  const prices = [
    { size: 35, price: 1200, title: "S" },
    { size: 45, price: 1500, title: "M" },
    { size: 55, price: 1800, title: "L" },
    { size: 65, price: 2100, title: "XL" },
  ];

  return (
    <section className="w-full flex flex-col justify-center lg:pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(550px,680px)_minmax(350px,450px)] gap-12 justify-center mb-10">
        <ProductGallery images={product.gallery} title={product.title} />
        <AddToCartForm
          productId={product.id}
          productSlug={product.slug}
          title={product.title}
          image={product.image}
          prices={prices}
        />
      </div>
      <ProductTabs />
      {recommendedProducts && (
        <div className="py-10 px-10">
          <h3 className="uppercase tracking-widest text-center mb-10">
            Вам так же может понравиться
          </h3>
          <ProductsCarousel products={recommendedProducts} />
        </div>
      )}
    </section>
  );
}
