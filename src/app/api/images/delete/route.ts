import { deleteImagesService } from "@/shared/server/services/images.service";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => null);
    const result = await deleteImagesService(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("Ошибка удаления картинок:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка удаления картинок" },
      { status: 500 },
    );
  }
}
