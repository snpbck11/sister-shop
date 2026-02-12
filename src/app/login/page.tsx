import { LoginForm } from "@/features/auth";
import { redirectIfAuthed } from "@/shared/auth/redirectIfAuthed";

export default async function LoginPage() {
  await redirectIfAuthed();

  return <LoginForm />;
}
