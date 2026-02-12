import { createProductService } from "@/shared/server/services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const result = await createProductService(body);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json({ success: false, error: "Ошибка при создании товара" }, { status: 500 });
  }
}