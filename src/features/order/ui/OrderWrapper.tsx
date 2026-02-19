"use client";

import { useCartStore } from "@/entities/cart";
import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import { OrderForm } from "./OrderForm";
import { OrderSummary } from "./OrderSummary";

export function OrderWrapper() {
  const { items, clearCart, totalItems, totalPrice, hasHydrated } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-admin-background  rounded-lg p-6">
        <p className="text-gray-500">Корзина пуста</p>
        <ButtonLink href={ROUTES.collections.allDesigns} text="Перейти к покупкам" />
      </div>
    );
  }

  return (
    <div className="w-full relative mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm
            items={items}
            clearCart={clearCart}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            totalItems={totalItems}
            totalPrice={totalPrice}
            hasHydrated={hasHydrated}
          />
        </div>
      </div>
    </div>
  );
}
