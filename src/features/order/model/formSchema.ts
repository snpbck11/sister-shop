import { DELIVERY_TYPE, PAYMENT_METHOD } from "@/entities/order";
import { z } from "zod";

export const paymentMethodSchema = z.enum([PAYMENT_METHOD.CARD]);

const addressBase = z.object({
  addressLine: z.string().min(1, "Введите адрес").max(200).trim(),
  city: z.string().min(1, "Введите город").max(100).trim(),
});

const base = z.object({
  customerName: z
    .string()
    .min(1, "Введите имя")
    .min(2, "Имя должно содержать минимум 2 символа")
    .trim(),
  phone: z
    .string()
    .regex(
      /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      "Неверный формат телефона",
    ),
  email: z.string().trim().optional(),
  paymentMethod: paymentMethodSchema.default(PAYMENT_METHOD.CARD).optional(),
  comment: z.string().max(500).optional(),
});

export const createOrderFormSchema = z.discriminatedUnion("deliveryType", [
  base.extend({
    deliveryType: z.literal(DELIVERY_TYPE.PICKUP),
    addressLine: z.never().optional(),
    city: z.never().optional(),
  }),
  base
    .extend({
      deliveryType: z.literal(DELIVERY_TYPE.POST),
    })
    .extend(addressBase.shape),
  base.extend({ deliveryType: z.literal(DELIVERY_TYPE.COURIER) }).extend(addressBase.shape),
]);

export type TCreateOrderForm = z.infer<typeof createOrderFormSchema>;
