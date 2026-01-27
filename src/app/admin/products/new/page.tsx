"use client";

import { Button, Input } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProductForm {
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  images: string[];
  prices: Array<{
    size: number;
    price: number;
    title: string;
  }>;
}

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductForm>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      categoryId: "",
      images: [],
      prices: [{ size: 35, price: 0, title: "S" }],
    },
  });

  const onSubmit = async (data: IProductForm) => {
    setIsSubmitting(true);
    console.log("Product data:", data);

    // Здесь будет API запрос
    await new Promise((resolve) => setTimeout(resolve, 1000));

    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Добавить товар</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">

          {/* Основная информация */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Основная информация</h2>

            <Input
              id="title"
              label="Название товара"
              required
              {...register("title", { required: "Введите название" })}
              error={errors.title?.message}
            />

            <Input
              id="slug"
              label="URL (slug)"
              required
              placeholder="choker-black-lace"
              {...register("slug", { required: "Введите slug" })}
              error={errors.slug?.message}
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Описание <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Введите описание" })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
                Категория <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryId"
                {...register("categoryId", { required: "Выберите категорию" })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
                <option value="">Выберите категорию</option>
                <option value="1">Чокеры</option>
                <option value="2">Ожерелья</option>
              </select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          {/* Изображения */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Изображения</h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <p className="text-gray-500">Загрузка изображений будет реализована позже</p>
            </div>
          </div>

          {/* Размеры и цены */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Размеры и цены</h2>

            <div className="grid grid-cols-3 gap-4">
              <Input
                id="size"
                label="Размер (см)"
                type="number"
                defaultValue={35}
                placeholder="35"
              />

              <Input
                id="price"
                label="Цена (₽)"
                type="number"
                defaultValue={0}
                placeholder="1500"
              />

              <Input
                id="sizeTitle"
                label="Название"
                defaultValue="S"
                placeholder="S"
              />
            </div>

            <Button type="button" variant="secondary">
              Добавить размер
            </Button>
          </div>

        </div>

        {/* Кнопки действий */}
        <div className="flex gap-4 mt-6">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
