import { loginAdminService } from "@/shared/server/services/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);

  const result = await loginAdminService(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const res = NextResponse.json(result);

  res.cookies.set("session", result.data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
