import { CategoryLink, ICategory } from "@/entities/category";

interface ICategoriesListProps {
  categories: ICategory[];
}

export function CategoriesList({ categories }: ICategoriesListProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-12 px-4 sm:px-0">
      <div className="flex justify-start sm:justify-center gap-6 sm:gap-12 min-w-min">
        {categories.map((category) => (
          <CategoryLink key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
