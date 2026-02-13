import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  image: z.string().min(1, "Картинка обязательна"),
  slug: z.string().min(1, "Slug обязателен"),
});

export type TCreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, "Название обязательно").optional(),
    description: z.string().min(1, "Описание обязательно").optional(),
    image: z.string().min(1, "Картинка обязательна").optional(),
  })
  .refine((v) => v.name !== undefined || v.description !== undefined, {
    message: "Нечего обновлять",
  });

export type TUpdateCategoryInput = z.infer<typeof updateCategorySchema>;
