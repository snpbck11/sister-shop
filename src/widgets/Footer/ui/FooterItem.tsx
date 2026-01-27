import { LucideIcon } from "lucide-react";

interface IFooterItemProps {
  icon: LucideIcon;
  title: string;
}
export function FooterItem({ icon: Icon, title }: IFooterItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <Icon className="w-10 h-10 text-background" />
      <span className="p-2 text-background uppercase text-xs w-50 sm:w-30">{title}</span>
    </div>
  );
}
