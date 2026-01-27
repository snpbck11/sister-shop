import { cn } from "@/shared/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MouseEvent } from "react";

interface IChevronButtonProps {
  direction: "left" | "right";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function ChevronButton({
  direction,
  disabled,
  onClick,
  className,
}: IChevronButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-black/50 hover:bg-black/70 text-white rounded-full p-2 cursor-pointer",
        "transition-opacity",
        className,
      )}>
      <Icon className="w-6 h-6" />
    </button>
  );
}
