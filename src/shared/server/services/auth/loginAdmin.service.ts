import { adminLoginSchema } from "@/entities/auth/model/schema";
import { ApiResponse } from "@/shared/api/http/types";
import { parseOrFail } from "@/shared/server/lib";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function loginAdminService(body: unknown): Promise<ApiResponse<{ token: string }>> {
  const parsed = parseOrFail(adminLoginSchema, body);
  if (!parsed.success) return parsed;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminHash || !jwtSecret) {
    return { success: false, error: "Сервер не настроен" };
  }

  const okEmail = parsed.data.email === adminEmail;
  const okPass = await bcrypt.compare(parsed.data.password.trim(), adminHash);

  if (!okEmail || !okPass) {
    return { success: false, error: "Неверные реквизиты" };
  }

  const secret = new TextEncoder().encode(jwtSecret);

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return { success: true, data: { token } };
}
