import { z } from "zod";

export const startPaymentSchema = z.object({
  orderId: z.uuid(),
});

export const createYookassaPaymentSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{2})$/, "Формат суммы 100.00"),
  description: z.string().min(1).max(255).optional(),
});

export type TCreateYookassaPaymentDto = z.infer<typeof createYookassaPaymentSchema>;
