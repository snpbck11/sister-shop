"use client";

import {
  ICategoryWithCount,
  TCategoryUdpatebleFields,
  TCreateCategoryInput,
  createCategory,
  deleteCategory,
  patchCategory,
} from "@/entities/category";
import { AdminPageLayout, Button, ConfirmModal, Table } from "@/shared/ui";
import { useState } from "react";
import { tableHead } from "../lib/tableHead";
import { AddCategoryModal } from "./AddCategoryModal";
import { CategoriesTableRow } from "./CategoriesTableRow";

interface ICategoriesTableProps {
  initialCategories: ICategoryWithCount[];
}

export function CategoriesTable({ initialCategories }: ICategoriesTableProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategoryWithCount | null>(null);

  const addCategory = async (data: TCreateCategoryInput) => {
    const res = await createCategory(data);

    if (!res.success) return { success: res.success, error: res.error };

    setCategories((prev) => [res.data, ...prev]);

    return { success: res.success, data: res.data };
  };

  const updateField = async (id: number, nextValue: string, key: TCategoryUdpatebleFields) => {
    const res = await patchCategory(id, { [key]: nextValue });

    if (!res.success) return { success: res.success, error: res.error };

    setCategories((prev) => prev.map((p) => (p.id === id ? { ...p, ...res.data } : p)));

    return { success: res.success, data: res.data };
  };

  const onConfirmDelete = async () => {
    if (!categoryToDelete) return;

    const { id } = categoryToDelete;

    const res = await deleteCategory(id);

    if (!res.success) throw new Error(res.error);

    setCategories((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminPageLayout
      title="Категории"
      addButtonText="Добавить категорию"
      addButtonCLick={() => setIsAddModalOpen(true)}>
      {categories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-admin-border">
          <p className="text-gray-500 mb-4">Категории не найдены</p>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            Добавить первую категорию
          </Button>
        </div>
      ) : (
        <Table tableHead={tableHead}>
          {categories.map((category) => (
            <CategoriesTableRow
              key={category.id}
              category={category}
              onDelete={() => setCategoryToDelete(category)}
              updateField={updateField}
            />
          ))}
        </Table>
      )}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={addCategory}
      />
      <ConfirmModal
        isOpen={!!categoryToDelete}
        confirmVariant="danger"
        title={"Удаление категории"}
        description={`Действительно удалить категорию "${categoryToDelete?.name}"?`}
        onConfirm={onConfirmDelete}
        onClose={() => setCategoryToDelete(null)}
      />
    </AdminPageLayout>
  );
}
