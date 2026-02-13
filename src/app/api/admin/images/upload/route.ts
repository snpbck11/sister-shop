import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { uploadImagesService } from "@/shared/server/services/images";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const formData = await req.formData();
    const result = await uploadImagesService(formData);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/admin/images/upload error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка загрузки изображений" },
      { status: 500 },
    );
  }
}
