import { createOrderService } from "@/shared/server/services/order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrderService(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при создании заказа" },
      { status: 500 },
    );
  }
}
