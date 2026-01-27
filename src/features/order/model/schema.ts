import { z } from "zod";

export const orderFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "Введите имя")
    .min(2, "Имя должно содержать минимум 2 символа")
    .trim(),

  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .regex(
      /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      "Неверный формат телефона",
    ),

  email: z.email("Неверный формат email").min(1, "Введите email"),

  city: z.string().min(1, "Введите город").trim(),

  address: z
    .string()
    .min(1, "Введите адрес")
    .min(5, "Адрес должен содержать минимум 5 символов")
    .trim(),

  deliveryMethod: z.enum(["pickup", "courier", "post"]),
  paymentMethod: z.enum(["card", "cash", "online"]),

  comment: z.string().optional(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
