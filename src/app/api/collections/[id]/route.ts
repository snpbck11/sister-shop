import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { deleteCollectionService, patchCollectionService } from "@/shared/server/services";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const body: unknown = await req.json();
    const { id } = await params;
    const result = await patchCollectionService(Number(id), body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("PATCH /api/collections/[id] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при обновлении коллекции" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const { id } = await params;

    const result = await deleteCollectionService(Number(id));

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("DELETE /api/collections/[id] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при удалении коллекции" },
      { status: 500 },
    );
  }
}
