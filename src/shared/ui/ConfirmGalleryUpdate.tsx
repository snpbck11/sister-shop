"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { DEFAULT_MAX } from "../config/storage";
import { Button, DeleteButton } from "./Buttons";
import { FieldError } from "./Controls/shared/FieldError";
import { Label } from "./Controls/shared/Label";
import { ConfirmModal } from "./Modals";

type IConfirmGalleryUpdateProps = {
  label?: string;
  value: string[];
  onAddImagesAction: (files: File[]) => Promise<void>;
  onRemoveImageAction: (url: string) => Promise<void>;
  disabled?: boolean;
  maxImages?: number;
  maxSizeBytes?: number;
};

export function ConfirmGalleryUpdate({
  label,
  value,
  onAddImagesAction,
  onRemoveImageAction,
  disabled,
  maxImages = 10,
  maxSizeBytes = DEFAULT_MAX,
}: IConfirmGalleryUpdateProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null);

  const pickFiles = () => {
    if (disabled || isLoading || value.length + pendingFiles.length >= maxImages) return;
    inputRef.current?.click();
  };

  const onPicked: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    for (const file of files) {
      if (file.size > maxSizeBytes) {
        setError(
          `Файл "${file.name}" слишком большой. Максимум ${Math.floor(maxSizeBytes / 1024 / 1024)}MB`,
        );
        e.target.value = "";
        return;
      }
    }

    setError(null);
    const availableSlots = maxImages - value.length - pendingFiles.length;
    const filesToAdd = files.slice(0, availableSlots);

    const previews = filesToAdd.map((file) => URL.createObjectURL(file));
    setPendingFiles((prev) => [...prev, ...filesToAdd]);
    setPendingPreviews((prev) => [...prev, ...previews]);

    e.target.value = "";
  };

  const cancelPending = () => {
    pendingPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setPendingFiles([]);
    setPendingPreviews([]);
    setError(null);
  };

  const removePendingFile = (index: number) => {
    URL.revokeObjectURL(pendingPreviews[index]!);
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    setPendingPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const commitAdd = async () => {
    if (!pendingFiles.length) return;

    setIsLoading(true);

    try {
      await onAddImagesAction(pendingFiles);
    } finally {
      setIsLoading(false);
      cancelPending();
    }
  };

  const handleRemove = (url: string) => {
    setUrlToDelete(url);
  };

  const confirmDelete = async () => {
    if (!urlToDelete) return;
    await onRemoveImageAction(urlToDelete);
    setUrlToDelete(null);
  };

  useEffect(() => {
    return () => {
      pendingPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {label && <Label label={label} />}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={`existing-${index}`} className="relative group">
            <Image
              src={url}
              alt={`Изображение ${index + 1}`}
              width={200}
              height={200}
              className="object-cover rounded-md border border-admin-border w-full aspect-square"
              unoptimized
            />
            {index !== 0 && (
              <DeleteButton
                onClick={() => handleRemove(url)}
                className="absolute top-2 right-2 hidden group-hover:block"
              />
            )}
          </div>  
        ))}

        {pendingPreviews.map((preview, index) => (
          <div key={`pending-${index}`} className="relative group">
            <Image
              src={preview}
              alt={`Новое изображение ${index + 1}`}
              width={200}
              height={200}
              className="object-cover rounded-md border-2 border-blue-500 w-full aspect-square"
              unoptimized
            />
            {!isLoading && (
              <DeleteButton
                onClick={() => removePendingFile(index)}
                className="absolute top-2 right-2 hidden group-hover:block"
              />
            )}
            <p className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Новое
            </p>
          </div>
        ))}

        {value.length + pendingFiles.length < maxImages && (
          <button
            onClick={pickFiles}
            disabled={disabled || isLoading}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center aspect-square hover:border-gray-400 dark:hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Plus className="w-8 h-8 text-gray-400" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onPicked}
      />

      {pendingFiles.length > 0 && (
        <div className="flex gap-2">
          <Button onClick={cancelPending} disabled={isLoading} variant="secondary" size="sm">
            Отмена
          </Button>
          <Button
            onClick={commitAdd}
            disabled={isLoading}
            variant="primary"
            size="sm"
            isLoading={isLoading}>
            Добавить {pendingFiles.length}{" "}
            {pendingFiles.length === 1 ? "изображение" : "изображений"}
          </Button>
        </div>
      )}
      {value.length + pendingFiles.length >= maxImages && (
        <p className="text-sm text-gray-500">Достигнут лимит изображений ({maxImages})</p>
      )}
      {error && <FieldError className="static" error={error} />}

      <ConfirmModal
        isOpen={!!urlToDelete}
        title="Удалить изображение?"
        description="Это действие нельзя отменить. Изображение будет удалено из галереи."
        onConfirm={confirmDelete}
        onClose={() => setUrlToDelete(null)}
      />
    </div>
  );
}
