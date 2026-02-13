import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { deleteProductService, patchProductService } from "@/shared/server/services/product";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const body: unknown = await req.json();
    const { id } = await params;
    const result = await patchProductService(Number(id), body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("PATCH /api/admin/products/[id] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при обновлении товара" },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const { id } = await params;

    const result = await deleteProductService(Number(id));

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("DELETE /api/admin/products/[id] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при удалении товара" },
      { status: 500 },
    );
  }
}
