"use client";

import { ICollectionWithCount, TCreateCollectionInput } from "@/entities/collection";
import { ApiResponse } from "@/shared/api/http/types";
import { deleteFile, uploadFile } from "@/shared/api/storage";
import { FormModal, ImageUpload, Input, TextArea } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCollectionFormSchema, TCreateCollectionForm } from "../model/formSchema";

interface IAddCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TCreateCollectionInput) => Promise<ApiResponse<ICollectionWithCount>>;
}

export function AddCollectionModal({ isOpen, onClose, onCreate }: IAddCollectionModalProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TCreateCollectionForm>({
    resolver: zodResolver(createCollectionFormSchema),
  });

  const handleClose = async () => {
    reset();
    onClose();
    setError(null);
  };

  const onSubmit = async (formData: TCreateCollectionForm) => {
    setError(null);

    try {
      const slug = slugify(formData.name);

      const { image } = formData;
      const imageUrl = await uploadFile(image, "collection", slug);

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
        setError("Ошибка при создании коллекции");
      }
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={handleClose}
      title={"Добавление коллекции"}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
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
        placeholder="Описание коллекции"
        {...register("description")}
        error={errors.description?.message}
      />
      <ImageUpload
        label="Изображение коллекции"
        required
        onChange={(files) => setValue("image", files[0], { shouldValidate: true })}
        error={errors.image?.message}
      />
    </FormModal>
  );
}
