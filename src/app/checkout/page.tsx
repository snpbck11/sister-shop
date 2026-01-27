"use client";

import { useCartStore } from "@/features/cart";
import { IOrderFormData, OrderForm, OrderSummary } from "@/features/order";
import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, totalItems, clearCart, hasHydrated } = useCartStore((state) => state);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: IOrderFormData) => {
    setIsSubmitting(true);

    // Здесь будет API запрос для создания заказа
    const orderData = {
      ...formData,
      items: items.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice,
      totalItems,
    };

    console.log("data:", orderData);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();

    router.push("/checkout/success");
  };

  if (items.length === 0 && hasHydrated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Добавьте товары в корзину перед оформлением заказа
        </p>
        <ButtonLink href={ROUTES.collections.allDesigns} text="Перейти к покупкам" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl relative mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
