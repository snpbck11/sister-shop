"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../model/cartStore";

export function CartButton() {
  const { totalItems, openCart } = useCartStore();

  return (
    <button
      onClick={openCart}
      className="relative p-2 hover:opacity-70 transition-opacity cursor-pointer"
      aria-label="Открыть корзину">
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}
