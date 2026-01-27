import { cn } from "@/shared/lib/cn";
import { ReactNode } from "react";

interface ITableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className }: ITableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-gray-200 dark:border-gray-700 last:border-0",
        "hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
        className,
      )}>
      {children}
    </tr>
  );
}
