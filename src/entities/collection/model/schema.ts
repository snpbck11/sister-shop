import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  image: z.string().min(1, "Картинка обязательна"),
  slug: z.string().min(1, "Slug обязателен"),
});

export type TCreateCollectionInput = z.infer<typeof createCollectionSchema>;

export const updateCollectionSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1, "Название обязательно").optional(),
    description: z.string().min(1, "Описание обязательно").optional(),
    image: z.string().min(1, "Картинка обязательна").optional(),
  })
  .refine((v) => v.name !== undefined || v.description !== undefined || v.image !== undefined, {
    message: "Нечего обновлять",
  });

export type TUpdateCollectionInput = z.infer<typeof updateCollectionSchema>;
