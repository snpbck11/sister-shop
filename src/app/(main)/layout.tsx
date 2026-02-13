import {
  getCachedCategories,
  getCachedCollections,
  getCachedProducts,
} from "@/shared/server/cache";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode;
}

export default async function MainLayout({ children }: IMainLayoutProps) {
  const [products, categories, collections] = await Promise.all([
    getCachedProducts(),
    getCachedCategories(),
    getCachedCollections(),
  ]);

  return (
    <>
      <Header categories={categories} collections={collections} products={products} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
