import { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ITableProps {
  tableHead: { title: string; className?: string }[];
  children: ReactNode;
}

export function Table({ tableHead, children }: ITableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <table className="w-full">
        <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <tr>
            {tableHead.map((item, index) => (
              <th
                key={item.title + index}
                className={cn("text-left p-4 font-semibold", item.className)}>
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
