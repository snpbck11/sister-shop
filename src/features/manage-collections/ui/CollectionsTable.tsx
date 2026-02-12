"use client";

import {
  createCollection,
  deleteCollection,
  ICollectionWithCount,
  patchCollection,
  TCollectionUdpatebleFields,
  TCreateCollectionInput,
} from "@/entities/collection";
import { ApiResponse } from "@/shared/api/http/types";
import { AdminPageLayout, Button, ConfirmModal, Table } from "@/shared/ui";
import { useState } from "react";
import { tableHead } from "../lib/tableHead";
import { AddCollectionModal } from "./AddCollectionModal";
import { CollectionsTableRow } from "./CollectionsTableRow";

interface ICollectionsTableProps {
  initialCollections: ICollectionWithCount[];
}

export function CollectionsTable({ initialCollections }: ICollectionsTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [collections, setCollections] = useState(initialCollections);
  const [collectionToDelete, setCollectionToDelete] = useState<ICollectionWithCount | null>(null);

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const addCollection = async (data: TCreateCollectionInput) => {
    const res = await createCollection(data);

    if (!res.success) return { success: res.success, error: res.error };

    setCollections((prev) => [res.data, ...prev]);

    return { success: res.success, data: res.data };
  };

  const updateField = async <K extends TCollectionUdpatebleFields>(
    id: number,
    nextValue: ICollectionWithCount[K],
    key: K,
  ): Promise<ApiResponse<ICollectionWithCount>> => {
    const res = await patchCollection(id, { [key]: nextValue });

    if (!res.success) {
      return { success: res.success, error: res.error };
    }

    setCollections((prev) => prev.map((p) => (p.id === id ? { ...p, ...res.data } : p)));

    return { success: res.success, data: res.data };
  };

  const onConfirmDelete = async () => {
    if (!collectionToDelete) return;

    const { id } = collectionToDelete;

    const res = await deleteCollection(id);
    
    if (!res.success) {
      throw new Error(res.error);
    }

    setCollections((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminPageLayout
      title="Коллекции"
      addButtonText="Добавить коллекцию"
      addButtonCLick={handleOpenModal}>
      {collections.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border-admin-border">
          <p className="text-gray-500 mb-4">Коллекции не найдены</p>
          <Button variant="primary" onClick={handleOpenModal}>
            Добавить первую коллекцию
          </Button>
        </div>
      ) : (
        <Table tableHead={tableHead}>
          {collections.map((collection) => (
            <CollectionsTableRow
              key={collection.id}
              collection={collection}
              onDelete={() => setCollectionToDelete(collection)}
              updateField={updateField}
            />
          ))}
        </Table>
      )}
      <AddCollectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={addCollection}
      />
      <ConfirmModal
        isOpen={!!collectionToDelete}
        confirmVariant="danger"
        title={"Удаление коллекции"}
        description={`Действительно удалить коллекцию "${collectionToDelete?.name}"?`}
        onConfirm={onConfirmDelete}
        onClose={() => setCollectionToDelete(null)}
      />
    </AdminPageLayout>
  );
}
