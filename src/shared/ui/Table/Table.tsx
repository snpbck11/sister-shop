import { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { LoadingLayout } from "../Layouts";
import { Pagination } from "../Pagination";

interface ITableProps {
  tableHead: { title: ReactNode; className?: string }[];
  children: ReactNode;
  pagination?: { page: number; pages: number; onChange: (page: number) => void };
  isLoading?: boolean;
}

export function Table({ tableHead, children, pagination, isLoading }: ITableProps) {
  return (
    <div className="flex flex-col bg-admin-sidebar-background rounded-lg shadow-sm border border-admin-border overflow-hidden h-full">
      <div className="flex-1 h-full overflow-auto relative">
        <LoadingLayout isLoading={isLoading} />
        <table>
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
      {pagination && (
        <div className="shrink-0">
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  );
}
