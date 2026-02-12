import { Plus } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../Buttons";

interface IAdminPageLayoutProps {
  title?: string;
  addButtonText?: string;
  addButtonCLick?: () => void;
  children: ReactNode;
}

export function AdminPageLayout({
  title,
  children,
  addButtonText,
  addButtonCLick,
}: IAdminPageLayoutProps) {
  const showAddButton = !!addButtonText && !!addButtonCLick;

  return (
    <div className="flex h-full flex-col gap-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center">
        {title && <h1 className="text-3xl font-bold">{title}</h1>}
        {showAddButton && (
          <Button variant="primary" size="sm" onClick={addButtonCLick}>
            <div className="flex items-center gap-1">
              <Plus className="w-5 h-5" />
              <p>{addButtonText}</p>
            </div>
          </Button>
        )}
      </div>

      <div className="flex-1 min-h-0 ">{children}</div>
    </div>
  );
}
