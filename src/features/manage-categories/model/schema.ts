import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
});

export type TCreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, "Название обязательно").optional(),
    description: z.string().min(1, "Описание обязательно").optional(),
  })
  .refine((v) => v.name !== undefined || v.description !== undefined, {
    message: "Нечего обновлять",
  });

export type TUpdateCategoryInput = z.infer<typeof updateCategorySchema>;
