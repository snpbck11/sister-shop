
import { getCachedCategories, getCachedCollections } from "@/shared/server/cache";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode;
}

export default async function MainLayout({ children }: IMainLayoutProps) {
  const [categories, collections] = await Promise.all([
    getCachedCategories(),
    getCachedCollections(),
  ]);

  return (
    <>
      <Header categories={categories} collections={collections} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
