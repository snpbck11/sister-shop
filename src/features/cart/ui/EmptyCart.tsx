"use client";

import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

interface IEmptyCartProps {
  onCloseCart: () => void;
}

export function EmptyCart({ onCloseCart }: IEmptyCartProps) {
  const pathname = usePathname();

  const href =
    pathname.includes("collections") || pathname.includes("products")
      ? pathname
      : ROUTES.collections.allDesigns;

  return (
    <div className="flex flex-col items-center justify-center h-full py-20 px-6">
      <div className="mb-6 p-6 rounded-full bg-gray-100 dark:bg-gray-800">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
      <p className="text-gray-500 text-center mb-6">Добавьте товары, чтобы продолжить покупки</p>
      <ButtonLink href={href} text="Перейти к покупкам" variant="primary" onClick={onCloseCart} />
    </div>
  );
}
