"use client";

import { ICategoryWithCount, TUdpatebleFields } from "@/entities/category";
import {
  AddCategoryModal,
  createCategoryAction,
  deleteCategoryAction,
} from "@/features/manage-categories";
import { updateCategoryAction } from "@/features/manage-categories/model/actions";
import { Button, ConfirmModal, Table } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tableHead } from "../lib/tableHead";
import { CategoriesTableRow } from "./CategoriesTableRow";

interface IAdminCategoriesTableProps {
  initialCategories: ICategoryWithCount[];
}

export function AdminCategoriesTable({ initialCategories }: IAdminCategoriesTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<ICategoryWithCount | null>(null);
  const router = useRouter();

  const onConfirmDelete = async () => {
    if (!deleteCategory) return;

    const res = await deleteCategoryAction(deleteCategory.id);

    if (!res.success) {
      throw new Error(res.error);
    }

    router.refresh();
  };


  const updateField = async (
    id: number,
    nextValue: string,
    key: TUdpatebleFields,
  ) => {
    const res = await updateCategoryAction({ id, [key]: nextValue });

    if (!res.success) {
      throw new Error(res.error);
    }

    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Категории</h1>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <div className="flex items-center gap-1">
            <Plus className="w-5 h-5" />
            <p>Добавить категорию</p>
          </div>
        </Button>
      </div>

      {initialCategories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 mb-4">Категории не найдены</p>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            Добавить первую категорию
          </Button>
        </div>
      ) : (
        <Table tableHead={tableHead}>
          {initialCategories.map((category) => (
            <CategoriesTableRow
              key={category.id}
              category={category}
              onDelete={() => setDeleteCategory(category)}
              updateField={updateField}
            />
          ))}
        </Table>
      )}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={createCategoryAction}
      />
      <ConfirmModal
        isOpen={!!deleteCategory}
        confirmVariant="danger"
        title={"Удаление категории"}
        description={`Действительно удалить категорию "${deleteCategory?.name}"?`}
        onConfirm={onConfirmDelete}
        onClose={() => setDeleteCategory(null)}
      />
    </div>
  );
}
