import { getCategories } from "@/entities/category";
import { AdminCategoriesTable } from "@/widgets/AdminCategoriesTable";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return <AdminCategoriesTable initialCategories={categories} />;
}
