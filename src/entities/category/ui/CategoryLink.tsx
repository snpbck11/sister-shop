import Image from "next/image";
import Link from "next/link";
import { ICategory } from "../model/types";

interface ICategoryLinkProps {
  category: ICategory;
}
export function CategoryLink({ category }: ICategoryLinkProps) {
  return (
    <Link
      key={category.name}
      href={`/categories/${category.slug}`}
      className="shrink-0 flex flex-col items-center gap-2">
      <Image
        className="w-22.5 h-22.5 object-center object-cover rounded-full border border-background ring-2 ring-foreground
               shadow-lg hover:scale-105 transition-transform"
        src={category.image}
        alt={category.name}
        width={90}
        height={90}
        sizes="90px"
      />
      <p className="text-sm sm:text-base whitespace-nowrap">{category.name}</p>
    </Link>
  );
}
