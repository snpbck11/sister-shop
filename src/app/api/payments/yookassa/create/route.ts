import { startPaymentForOrderService } from "@/shared/server/services/payments";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await startPaymentForOrderService(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e) {
    console.error("POST /api/payments/start error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при старте оплаты" },
      { status: 500 },
    );
  }
}
