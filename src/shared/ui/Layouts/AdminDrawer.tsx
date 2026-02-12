import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { Drawer } from "../Drawer";

interface IAdminDrawerProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export function AdminDrawer({ open, onClose, children, title }: IAdminDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      drawerClassname="w-full max-w-5xl"
      headerContent={
        <div className="bg-admin-background border-b border-admin-border flex items-center justify-between p-4">
          <ChevronRight
            className="w-8 h-8 cursor-pointer text-black dark:text-white"
            onClick={onClose}
          />
          {title && <h1 className="text-3xl font-bold">{title}</h1>}
        </div>
      }>
      <div className="bg-admin-sidebar-background flex-1 min-h-0 flex flex-col">{children}</div>
    </Drawer>
  );
}
