import { cn } from "../../../lib/cn";

interface IFieldErrorProps {
  error?: string;
  className?: string;
}

export function FieldError({ error, className }: IFieldErrorProps) {
  if (!error) return null;

  return <p className={cn("absolute -bottom-4 left-1 text-error text-xs", className)}>{error}</p>;
}
