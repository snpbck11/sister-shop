import { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ITableProps {
  tableHead: { title: ReactNode; className?: string }[];
  children: ReactNode;
}

export function Table({ tableHead, children }: ITableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-admin-border overflow-hidden h-full min-h-0">
      <div className="w-full h-full min-h-0 overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 border-b border-admin-border bg-admin-background">
            <tr>
              {tableHead.map((item, index) => (
                <th
                  key={index}
                  className={cn("text-left p-4 font-semibold whitespace-nowrap", item.className)}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
