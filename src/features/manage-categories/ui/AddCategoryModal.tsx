"use client";

import { ICategory, TCreateCategoryInput } from "@/entities/category";
import { TCreateCollectionInput } from "@/entities/collection";
import { TCreateCollectionForm } from "@/features/manage-collections/model/formSchema";
import { ApiResponse } from "@/shared/api/http/types";
import { deleteFile, uploadFile } from "@/shared/api/storage";
import { FormModal, ImageUpload, Input, TextArea } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCategoryFormSchema } from "../model/formSchema";

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
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(createCategoryFormSchema),
  });

  const handleClose = () => {
    setError(null);
    reset();
    onClose();
  };

  const submit = async (formData: TCreateCollectionForm) => {
    setError(null);

    try {
      const slug = slugify(formData.name);

      const { image } = formData;
      const imageUrl = await uploadFile(image, "category", slug);

      if (imageUrl.length === 0) {
        return setError("Ошибка при загрузке картинки");
      }

      const collectionData: TCreateCollectionInput = {
        ...formData,
        slug,
        image: imageUrl,
      };

      const res = await onCreate(collectionData);

      if (!res.success) {
        await deleteFile(imageUrl);
        return setError(res.error);
      }

      onClose();
      reset();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ошибка при создании товара");
      }
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={"Добавление категории"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(submit)}
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
      <ImageUpload
        label="Изображение категории"
        required
        onChange={(files) => setValue("image", files[0], { shouldValidate: true })}
        error={errors.image?.message}
      />
    </FormModal>
  );
}
