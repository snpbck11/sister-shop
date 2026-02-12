import z from "zod";

export const createCollectionFormSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  image: z.instanceof(File, { message: "Изображение обязательно" }),
});

export type TCreateCollectionForm = z.infer<typeof createCollectionFormSchema>;
