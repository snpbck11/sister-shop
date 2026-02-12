import { productSizeSchema } from "@/entities/product-size";
import z from "zod";

export const createProductFormSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  description: z.string().nullable(),
  typeId: z.number().min(1),
  image: z.instanceof(File, { message: "Изображение обязательно" }),
  hoverImage: z.instanceof(File, { message: "Изображение обязательно" }),
  gallery: z.array(z.instanceof(File)).min(1, "Добавьте хотя бы одно изображение в галерею"),
  categoryId: z.number().min(1, "Категория обязательна"),
  collections: z.array(z.number()).min(1, "Добавьте хотя бы одну коллекцию"),
  sizes: z.array(productSizeSchema).min(1, "Добавьте хотя бы один размер"),
});

export type TCreateProductForm = z.infer<typeof createProductFormSchema>;