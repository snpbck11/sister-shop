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
        "border-b border-admin-border last:border-0",
        "hover:bg-admin-background transition-colors",
        className,
      )}>
      {children}
    </tr>
  );
}
