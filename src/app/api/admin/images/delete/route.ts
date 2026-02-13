import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { deleteImagesService } from "@/shared/server/services/images";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { response } = await requireSessionApi();
  if (response) return response;

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
