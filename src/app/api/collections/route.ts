import { requireSessionApi } from "@/shared/auth/requireSessionApi";
import { createCollectionService } from "@/shared/server/services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { response } = await requireSessionApi();
  if (response) return response;

  try {
    const body: unknown = await req.json();
    const result = await createCollectionService(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/collections error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при создании коллекции" },
      { status: 500 },
    );
  }
}
