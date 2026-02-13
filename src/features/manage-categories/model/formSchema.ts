import z from "zod";

export const createCategoryFormSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  image: z.instanceof(File, { message: "Изображение обязательно" }),
});

export type TCreateCategoryForm = z.infer<typeof createCategoryFormSchema>;
