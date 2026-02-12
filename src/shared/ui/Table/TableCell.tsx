import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface ITableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function TableCell({ children, className, align = "left" }: ITableCellProps) {
  return (
    <td
      className={cn(
        "p-4 font-medium",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}>
      {children}
    </td>
  );
}
