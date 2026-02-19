import { Logo } from "@/shared/ui";
import { ReactNode } from "react";

interface ICheckoutLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ICheckoutLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="px-4 py-1 flex justify-center border-b border-b-black/8 dark:border-b-white/[0.145]">
        <Logo />
      </header>
      {children}
    </div>
  );
}
