import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Choker Tyumen — чокеры, ожерелья и браслеты",
  description:
    "Авторские чокеры, ожерелья и браслеты в Тюмени. Минималистичные украшения, ограниченные коллекции, доставка по городу и России.",

  keywords: [
    "чокеры Тюмень",
    "купить чокер Тюмень",
    "ожерелья Тюмень",
    "браслеты Тюмень",
    "украшения Тюмень",
    "чокеры на шею",
    "авторские украшения",
  ],

  openGraph: {
    title: "Choker Tyumen",
    description: "Минималистичные чокеры, ожерелья и браслеты. Локальный бренд из Тюмени.",
    type: "website",
    locale: "ru_RU",
    siteName: "Choker Tyumen",
  },

  alternates: {
    canonical: "https://chokertyumen.ru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${oswald.className} antialiased bg-background`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
