import { DELIVERY_TYPE, PAYMENT_METHOD } from "@/entities/order";
import { z } from "zod";

export const paymentMethodSchema = z.enum([PAYMENT_METHOD.CARD]);

const addressBase = z.object({
  addressLine: z.string().min(1, "Кроме самовывоза все с адресами").max(200).trim(),
  city: z.string().min(1, "Кроме самовывоза все с городом").max(100).trim(),
});

export const orderItemInputSchema = z.object({
  sizeId: z.number().int().positive(),
  qty: z.number().int().positive().max(999),
});

const base = z.object({
  items: z.array(orderItemInputSchema),
  customerName: z.string().min(2, "Имя обязательно").trim(),
  phone: z
    .string()
    .regex(
      /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      "Неверный формат телефона",
    ),
  email: z.string().trim().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  comment: z.string().max(500).optional(),
});

export const createOrderSchema = z.discriminatedUnion("deliveryType", [
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

export type TCreateOrderInput = z.infer<typeof createOrderSchema>;
