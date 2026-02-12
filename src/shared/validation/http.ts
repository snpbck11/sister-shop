import { ZodError } from "zod";

type TFieldErrors = Record<string, string[]>;

export function zodToBadRequest(error: ZodError) {
  const fieldErrors: TFieldErrors = {};
  const formErrors: string[] = [];

  for (const issue of error.issues) {
    const path = issue.path.join(".");

    if (!path) {
      formErrors.push(issue.message);
    }

    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }

    fieldErrors[path].push(issue.message);
  }

  return {
    error: "Ошибки валидации",
    fieldErrors,
    formErrors,
  };
}
