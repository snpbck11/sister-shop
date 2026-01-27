import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface ITableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className }: ITableCellProps) {
  return <td className={cn("p-4 font-medium", className)}>{children}</td>;
}
