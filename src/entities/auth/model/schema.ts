import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export type TAdminLoginInput = z.infer<typeof adminLoginSchema>;
