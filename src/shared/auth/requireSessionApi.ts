import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function requireSessionApi() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { session, response: null };
}
