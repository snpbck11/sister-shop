"use client";

import { IProductWithRelations } from "@/entities/product";
import { ICreateProductSize, IProductSize } from "@/entities/product-size";
import { ApiResponse } from "@/shared/api/http/types";
import { Button, ConfirmModal, DeleteButton, ErrorMessage, Input } from "@/shared/ui";
import { useState } from "react";

interface ISizesEditorProps {
  value: IProductSize[];
  onChange: (next: ICreateProductSize[]) => Promise<ApiResponse<IProductWithRelations> | undefined>;
}

const emptySize = (): ICreateProductSize => ({ name: "", description: "", price: 0 });

export function SizesEditor({ value, onChange }: ISizesEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<ICreateProductSize>(emptySize());
  const [sizeToDelete, setSizeToDelete] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const confirmDelete = async () => {
    const res = await onChange(value.filter((size) => size.id !== sizeToDelete));

    if (!res?.success) {
      setError(res?.error || "Ошибка при удалении");
    }
  };

  const openAdd = () => {
    setDraft(emptySize());
    setIsAdding(true);
  };

  const cancelAdd = () => {
    setError(null);
    setIsAdding(false);
    setDraft(emptySize());
  };

  const submitAdd = async () => {
    setIsLoading(true);
    setError(null);
    const res = await onChange([...value, draft]);

    if (!res?.success) {
      setError(res?.error || "Ошибка при сохранении размера");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    cancelAdd();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Размеры и цены</h2>
        {!isAdding && (
          <Button type="button" variant="secondary" onClick={openAdd}>
            Добавить размер
          </Button>
        )}
      </div>
      {isAdding && (
        <fieldset
          disabled={isLoading}
          className="p-4 border border-admin-border rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <Input
              label="Название"
              placeholder="S, M, L..."
              value={draft.name ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            />
            <Input
              label="Описание"
              placeholder="Например: 35-36 см"
              value={draft.description ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            />
            <Input
              label="Цена (₽)"
              type="number"
              placeholder="1500"
              value={Number.isFinite(draft.price) ? String(draft.price) : "0"}
              onChange={(e) => {
                const n = e.target.value === "" ? 0 : Number(e.target.value);
                setDraft((d) => ({ ...d, price: Number.isFinite(n) ? n : 0 }));
              }}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={cancelAdd}>
              Отмена
            </Button>
            <Button type="button" onClick={submitAdd} isLoading={isLoading}>
              Сохранить
            </Button>
          </div>
        </fieldset>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {value.map((size, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-4 border border-admin-border rounded-lg">
            <div className="space-y-1">
              <div className="font-medium">{size.name}</div>
              {size.description ? (
                <div className="text-sm opacity-70">{size.description}</div>
              ) : null}
              <div className="text-sm">{size.price} ₽</div>
            </div>
            {index !== 0 && <DeleteButton onClick={() => setSizeToDelete(size.id)} />}
          </div>
        ))}
      </div>

      {error && <ErrorMessage error={error} />}

      <ConfirmModal
        isOpen={!!sizeToDelete}
        title="Удалить размер?"
        description="Это действие нельзя отменить. Размер будет удален."
        onConfirm={confirmDelete}
        onClose={() => setSizeToDelete(null)}
      />
    </div>
  );
}
