import z from "zod";

export const productSizeSchema = z.object({
  name: z.string().min(1, "Название размера обязательно"),
  description: z.string().nullable(),
  price: z.number().min(1, "Цена должна быть больше 0"),
});

export type TProductSizeInput = z.infer<typeof productSizeSchema>;
