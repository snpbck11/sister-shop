import { X } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "@/shared/lib/cn";

interface ICloseButtonProps {
  onClick: () => void;
  iconClassName?: string;
  buttonClassName?: string;
}

export function CloseButton({ onClick, iconClassName, buttonClassName }: ICloseButtonProps) {
  return (
    <IconButton
      icon={X}
      onClick={onClick}
      buttonClassName={buttonClassName}
      iconClassName={cn("w-8 h-8", iconClassName)}
    />
  );
}
