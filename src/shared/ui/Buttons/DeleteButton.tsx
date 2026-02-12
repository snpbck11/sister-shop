import { Trash2 } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "@/shared/lib/cn";

interface IDeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function DeleteButton({ onClick, disabled = false, className }: IDeleteButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      icon={Trash2}
      buttonClassName={cn(
        "hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 disabled:opacity-50",
        className,
      )}
    />
  );
}
