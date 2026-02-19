import { handleYookassaWebhookService } from "@/shared/server/services/payments/yookassa";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await handleYookassaWebhookService(body);

    if (!result.success) {
      console.warn("YooKassa webhook недействителен:", result.error);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("YooKassa webhook error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
