"use client";

import { ProductCard } from "@/entities/product";
import { ICarouselItem } from "@/shared/config/carouselProducts";
import useBreakpoint from "@/shared/hooks/useBreakpoint";
import { Carousel } from "@/shared/ui";

interface IProductsCarouselProps {
  products: ICarouselItem[];
  className?: string;
}

export function ProductsCarousel({ products, className }: IProductsCarouselProps) {
  const breakpoint = useBreakpoint();

  const config = {
    mobile: { itemsToShow: 1.5, gap: 16 },
    tablet: { itemsToShow: 3, gap: 20 },
    desktop: { itemsToShow: 4, gap: 60 },
  };

  const { itemsToShow, gap } = config[breakpoint];

  return (
    <Carousel
      items={products}
      renderItem={(product) => (
        <ProductCard
          slug={product.slug}
          image={product.image}
          hoverImage={product.hoverImage}
          title={product.title}
          cost={product.price}
        />
      )}
      itemsToShow={itemsToShow}
      gap={gap}
      className={className}
    />
  );
}
