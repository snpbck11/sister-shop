"use client";

import { useCartStore } from "@/features/cart";
import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export function OrderSummary() {
  const { items, totalItems, totalPrice, hasHydrated } = useCartStore();

  if (!hasHydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center">
        <p className="text-gray-500">Корзина пуста</p>
        <ButtonLink href={ROUTES.collections.allDesigns} text="Перейти к покупкам" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6 sticky top-3">
      <h2 className="text-xl font-semibold">Ваш заказ</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-3">
            <Link
              href={`/products/${item.slug}`}
              className="relative w-16 h-16 rounded overflow-hidden shrink-0">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="font-medium hover:underline line-clamp-1">
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">
                {item.size} × {item.quantity}
              </p>
              <p className="text-sm font-semibold">{item.price * item.quantity} ₽</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Товары ({totalItems})</span>
          <span>{totalPrice} ₽</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Доставка</span>
          <span>Рассчитывается при оформлении</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
          <span>Итого</span>
          <span>{totalPrice} ₽</span>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        После оформления заказа с вами свяжется менеджер для уточнения деталей доставки
      </p>
    </div>
  );
}
