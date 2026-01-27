"use client";

import { createCategoryAction } from "@/features/manage-categories";
import {
  createCategorySchema,
  TCreateCategoryInput,
} from "@/features/manage-categories/model/schema";
import { Button, FieldError, Input, Modal, TextArea } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IAddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function AddCategoryModal({ isOpen, onClose }: IAddCategoryModalProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = async (data: TCreateCategoryInput) => {
    const res = await createCategoryAction(data);

    if (!res.success) {
      setError(res.error ? res.error : "Ошибка при создании категории");
      return;
    }

    setError(null);
    reset();
    onClose();
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-xl w-full p-4">
        <h2 className="text-xl font-semibold mb-4">Добавить категорию</h2>

        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded text-sm">
              {error}
              <FieldError />
            </div>
          )}
          <Input
            label="Название"
            required
            placeholder="Введи название"
            {...register("name")}
            error={errors.name?.message}
          />
          <TextArea
            label="Описание"
            required
            rows={4}
            placeholder="Описание категории"
            {...register("description")}
            error={errors.description?.message}
          />
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
