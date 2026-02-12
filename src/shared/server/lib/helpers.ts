import { ApiResponse } from "@/shared/api/http/types";
import type { ZodTypeAny, z } from "zod";

export function parseOrFail<TSchema extends ZodTypeAny>(
  schema: TSchema,
  input: unknown,
): ApiResponse<z.infer<TSchema>> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Ошибка валидации",
    };
  }

  return { success: true, data: parsed.data };
}

export function extractKeyFromPublicUrl(url: string, base: string): string {
  if (!base) throw new Error("YC_PUBLIC_BASE не задан");

  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  if (!url.startsWith(normalizedBase)) {
    throw new Error("URL не относится к текущему публичному base");
  }

  const key = url.slice(normalizedBase.length);
  if (!key) throw new Error("Не удалось получить key из url");

  return key;
}
