import { cn } from "../lib/cn";

interface IFieldErrorProps {
  error?: string;
  className?: string;
}

export function FieldError({ error, className }: IFieldErrorProps) {
  if (!error) return null;

  return <p className={cn("text-red-500 text-xs", className)}>{error}</p>;
}
