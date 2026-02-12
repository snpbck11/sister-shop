"use client";

import { createCategorySchema, ICategory, TCreateCategoryInput } from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import { FormModal, Input, TextArea } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IAddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TCreateCategoryInput) => Promise<ApiResponse<ICategory>>;
}

export function AddCategoryModal({ isOpen, onClose, onCreate }: IAddCategoryModalProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createCategorySchema),
  });

  const handleClose = () => {
    setError(null);
    reset();
    onClose();
  };

  const submit = handleSubmit(async (data: TCreateCategoryInput) => {
    const res = await onCreate(data);

    if (!res.success) {
      setError(res.error || "Ошибка при создании категории");
      return;
    }

    handleClose();
    return { succes: true, data: res.data };
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={"Добавление коллекции"}
      isSubmitting={isSubmitting}
      onSubmit={submit}
      error={error}>
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
    </FormModal>
  );
}
