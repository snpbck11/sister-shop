import { cn } from "@/shared/lib/cn";

interface ISpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export function Spinner({ size = "md", className }: ISpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-current border-t-transparent",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Загрузка">
      <span className="sr-only">Загрузка...</span>
    </div>
  );
}
