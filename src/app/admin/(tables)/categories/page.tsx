import { CategoriesTable } from "@/features/manage-categories";
import { getCategories } from "@/shared/server/db";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return <CategoriesTable initialCategories={categories} />;
}
