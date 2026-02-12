import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectIfAuthed() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    await jwtVerify(token, secret);
  } catch {
    return;
  }

  redirect("/admin");
}
