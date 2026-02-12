import Image from "next/image";
import Link from "next/link";
import { categoriesList } from "../lib/categoriesList";

export function CategoriesList() {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-12 px-4 sm:px-0">
      <div className="flex justify-start sm:justify-center gap-6 sm:gap-12 min-w-min">
        {categoriesList.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="shrink-0 flex flex-col items-center gap-2">
            <Image
              className="w-22.5 h-22.5 object-center object-cover rounded-full border border-white ring-2 ring-black dark:ring-white dark:border-black shadow-lg hover:scale-105 transition-transform"
              src={category.iconUrl}
              alt={category.title}
              width={90}
              height={90}
              sizes="90px"
            />
            <p className="text-sm sm:text-base whitespace-nowrap">{category.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
