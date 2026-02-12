import type { ApiResponse } from "./types";

export async function request<T>(input: RequestInfo, init?: RequestInit): Promise<ApiResponse<T>> {
  const isFormData = init?.body instanceof FormData;

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers ?? {}),
    },
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!json) {
    return { success: false, error: "Пустой ответ сервера" };
  }

  return json;
}
