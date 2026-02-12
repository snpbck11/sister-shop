import { productSizeSchema } from "@/entities/product-size";
import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  slug: z.string().min(1, "Slug обязателен"),
  description: z.string().nullable(),
  typeId: z.number().min(1),
  image: z.string().min(1, "Изображение обязательно"),
  hoverImage: z.string().min(1, "Изображение обязательно"),
  gallery: z.array(z.string()).min(1, "Добавьте хотя бы одно изображение в галерею"),
  categoryId: z.number().min(1, "Категория обязательна"),
  collections: z.array(z.number()).min(1, "Добавьте хотя бы одну коллекцию"),
  sizes: z.array(productSizeSchema).min(1, "Добавьте хотя бы один размер"),
});

export const updateProductSchema = z
  .object({
    id: z.number(),
    title: z.string().min(1, "Название обязательно").optional(),
    description: z.string().optional(),
    image: z.string().min(1, "Изображение обязательно").optional(),
    hoverImage: z.string().min(1, "Изображение обязательно").optional(),
    gallery: z.array(z.string().url()).optional(),
    categoryId: z.number().min(1, "Категория обязательна").optional(),
    collections: z.array(z.number()).optional(),
    sizes: z.array(productSizeSchema).optional(),
  })
  .refine(
    (v) =>
      v.title !== undefined ||
      v.description !== undefined ||
      v.image !== undefined ||
      v.hoverImage !== undefined ||
      v.gallery !== undefined ||
      v.categoryId !== undefined ||
      v.collections !== undefined ||
      v.sizes !== undefined,
    {
      message: "Нечего обновлять",
    },
  );

export type TCreateProductInput = z.infer<typeof createProductSchema>;
export type TUpdateProductInput = z.infer<typeof updateProductSchema>;
