import { getOrderByIdService } from "@/shared/server/services/order";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params;
    const result = await getOrderByIdService(orderId);
    return NextResponse.json(result, { status: result.success ? 200 : 404 });
  } catch (e) {
    console.error("GET /api/orders/[orderId] error:", e);
    return NextResponse.json(
      { success: false, error: "Ошибка при получении заказа" },
      { status: 500 },
    );
  }
}
