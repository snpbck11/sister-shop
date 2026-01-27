import { Trash2 } from "lucide-react";
import { IconButton } from "./IconButton";

interface IDeleteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DeleteButton({ onClick, disabled = false }: IDeleteButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      icon={Trash2}
      buttonClassName="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 disabled:opacity-50"
    />
  );
}
