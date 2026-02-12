import { ReactNode } from "react";

interface IDetailsFieldProps {
  title: string;
  children: ReactNode;
}
export function DetailsField({ title, children }: IDetailsFieldProps) {
  return (
    <div className="flex gap-2 items-baseline">
      <p className="text-sm font-medium py-3.5">{title}:</p>
      {children}
    </div>
  );
}
