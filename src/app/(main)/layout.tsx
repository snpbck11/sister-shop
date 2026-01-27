import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: IMainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
