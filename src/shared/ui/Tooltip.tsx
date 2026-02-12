"use client";

import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface ITooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  tooltipClassname?: string;
}

const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip({ content, children, position = "top", tooltipClassname }: ITooltipProps) {
  return (
    <div className="relative group">
      {children}

      <div
        role="tooltip"
        className={cn(
          "absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded",
          "opacity-0 scale-95 pointer-events-none",
          "transition-all duration-150 ease-out",
          "group-hover:opacity-100 group-hover:scale-100",
          positionStyles[position],
          tooltipClassname,
        )}>
        {content}

        <div
          className={cn(
            "absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45",
            position === "top" && "-bottom-1 left-1/2 -translate-x-1/2",
            position === "bottom" && "-top-1 left-1/2 -translate-x-1/2",
            position === "left" && "-right-1 top-1/2 -translate-y-1/2",
            position === "right" && "-left-1 top-1/2 -translate-y-1/2",
          )}
        />
      </div>
    </div>
  );
}
