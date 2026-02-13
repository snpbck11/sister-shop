"use client";

import { IProductWithRelations, TCreateProductInput } from "@/entities/product";
import { ApiResponse } from "@/shared/api/http/types";
import { deleteFiles, uploadFiles } from "@/shared/api/storage";
import {
  AdminDrawer,
  Button,
  ErrorMessage,
  ImageUpload,
  Input,
  ISelectOption,
  Select,
  TextArea,
} from "@/shared/ui";
import { MultiSelect } from "@/shared/ui/Controls";
import { LoadingLayout } from "@/shared/ui/Layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createProductFormSchema, TCreateProductForm } from "../model/formSchema";
import { SizesManager } from "./SizesManager";

interface IAddProductDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: ISelectOption[];
  collections: ISelectOption[];
  types: ISelectOption[];
  onCreate: (data: TCreateProductInput) => Promise<ApiResponse<IProductWithRelations>>;
}

export default function AddProductDrawer({
  open,
  onClose,
  categories,
  types,
  collections,
  onCreate,
}: IAddProductDrawerProps) {
  const [error, setError] = useState<string | null>(null);

  const defaultCollection = Number(collections[0]?.value);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TCreateProductForm>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      gallery: [],
      typeId: Number(types[0]?.value),
      collections: [defaultCollection],
      sizes: [{ name: "", description: "", price: 0 }],
      title: "",
      description: "",
      categoryId: 0,
    },
  });

  const handleCloseDrawer = () => {
    onClose();
    setError(null);
    reset();
  };

  const onSubmit = async (formData: TCreateProductForm) => {
    setError(null);

    try {
      const slug = slugify(formData.title);

      const allFiles = [formData.image, formData.hoverImage, ...formData.gallery];
      const allUrls = await uploadFiles(allFiles, "products", slug);

      if (allUrls.length < allFiles.length) {
        await deleteFiles(allUrls);
        return setError("Ошибка загрузки изображений");
      }

      const [imageUrl, hoverImageUrl, ...galleryUrls] = allUrls;

      const productData: TCreateProductInput = {
        ...formData,
        slug,
        image: imageUrl,
        hoverImage: hoverImageUrl,
        gallery: galleryUrls,
      };

      const res = await onCreate(productData);

      if (!res.success) {
        await deleteFiles(allUrls);
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
    <AdminDrawer open={open} onClose={handleCloseDrawer} title="Добавление товара">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full min-h-0 flex-col relative">
        <LoadingLayout isLoading={isSubmitting} />
        <fieldset disabled={isSubmitting} className="contents">
          {error && (
            <div className="p-4">
              <ErrorMessage error={error} />
            </div>
          )}
          <div className="flex-1 min-h-0 overflow-auto p-2 lg:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Основная информация</h2>
                <Input
                  id="title"
                  label="Название товара"
                  required
                  {...register("title")}
                  error={errors.title?.message}
                />
                <TextArea id="description" label="Описание" {...register("description")} />
                <Controller
                  name="typeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="typeId"
                      required
                      label="Тип"
                      placeholder="Выберите тип"
                      value={field.value}
                      options={types}
                      onChange={(next) => field.onChange(next)}
                      error={errors.typeId?.message}
                    />
                  )}
                />
                {categories.length !== 0 ? (
                  <Controller
                    name="categoryId"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Select
                        id="categoryId"
                        required
                        label="Категория"
                        placeholder="Выберите категорию"
                        value={field.value}
                        options={categories}
                        onChange={(next) => field.onChange(next)}
                        error={errors.categoryId?.message}
                      />
                    )}
                  />
                ) : (
                  <p>{`Сперва добавьте категории в разделе "Категории"`}</p>
                )}
                {collections.length !== 0 ? (
                  <Controller
                    name="collections"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <MultiSelect
                        id="collections"
                        required
                        label="Коллекции"
                        options={collections}
                        placeholder="Выберите коллекции"
                        value={field.value}
                        onChange={(next) => field.onChange(next.map(Number))}
                        error={errors.collections?.message}
                      />
                    )}
                  />
                ) : (
                  <p>{`Сперва добавьте коллекции в разделе "Коллекции"`}</p>
                )}
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Изображения</h2>
                <div className="grid grid-cols-2 gap-4">
                  <ImageUpload
                    label="Основное изображение"
                    required
                    onChange={(files) => setValue("image", files[0], { shouldValidate: true })}
                    error={errors.image?.message}
                  />
                  <ImageUpload
                    label="Изображение при наведении"
                    required
                    onChange={(files) => setValue("hoverImage", files[0], { shouldValidate: true })}
                    error={errors.hoverImage?.message}
                  />
                </div>
                <ImageUpload
                  required
                  label="Галерея"
                  onChange={(files) => setValue("gallery", files, { shouldValidate: true })}
                  multiple
                  error={errors.gallery?.message}
                />
              </div>
            </div>
            <SizesManager
              control={control}
              register={register}
              errors={errors}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex shrink-0 gap-4 p-4 bg-admin-background">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Загрузка и сохранение..." : "Сохранить"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseDrawer}>
              Отмена
            </Button>
          </div>
        </fieldset>
      </form>
    </AdminDrawer>
  );
}
