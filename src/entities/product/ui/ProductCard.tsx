"use client";

import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { IStorefrontProductCard } from "../model/types/storefront";

interface IProductCardProps {
  product: IStorefrontProductCard;
  className?: string;
}

export function ProductCard({ product, className }: IProductCardProps) {
  const { slug, image, hoverImage, title, priceFrom } = product;

  const alt = `Изображение товара ${title}`;

  return (
    <Link href={`/products/${slug}`} className="block">
      <div className={cn("relative aspect-square overflow-hidden cursor-pointer", className)}>
        <Image src={image} alt={alt} fill sizes="auto" className="object-cover object-center" />
        <Image
          src={hoverImage}
          alt={alt}
          fill
          sizes="auto"
          className={cn(
            "object-cover object-center opacity-0 transition-opacity duration-500 ease-in-out",
            "hover:opacity-100",
          )}
        />
      </div>
      <div className="flex flex-col mt-5 items-center">
        <p className="text-white px-3 py-0.5 bg-[#484747] text-xs uppercase">Ограниченный выпуск</p>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">от {priceFrom} ₽</p>
      </div>
    </Link>
  );
}
