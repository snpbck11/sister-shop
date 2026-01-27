import { cn } from "@/shared/lib/cn";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  iconClassName?: string;
  buttonClassName?: string;
  icon: LucideIcon;
}

export function IconButton({
  onClick,
  iconClassName,
  buttonClassName,
  icon,
  ...rest
}: IIconButtonProps) {
  const Icon = icon;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors p-1",
        buttonClassName,
      )}
      {...rest}>
      <Icon className={cn("w-4 h-4", iconClassName)} />
    </button>
  );
}
