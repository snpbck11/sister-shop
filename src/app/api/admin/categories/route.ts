import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { createCategoryService } from "@/shared/server/services/category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const body: unknown = await req.json();
    const result = await createCategoryService(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/admin/categories error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при создании категории" },
      { status: 500 },
    );
  }
}
