import { uploadImagesService } from "@/shared/server/services/images.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await uploadImagesService(formData);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/images/upload error:", e);
    return NextResponse.json({ success: false, error: "Ошибка загрузки изображений" }, { status: 500 });
  }
}
