"use client";

import { useCartStore } from "@/entities/cart";
import { getOrderById, IOrderWithDetails, ORDER_STATUS } from "@/entities/order";
import { Button, ErrorMessage } from "@/shared/ui";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatRub } from "../lib/formatRub";
import { OrderTextItem } from "./OrderTextItem";

interface ICheckoutNotificationProps {
  orderId?: string;
}

export function CheckoutNotification({ orderId }: ICheckoutNotificationProps) {
  const { clearCart } = useCartStore();

  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<IOrderWithDetails | null>(null);
  const clearedRef = useRef(false);

  const derivedError = !orderId
    ? "Нет номера заказа. Вернитесь в корзину и попробуйте ещё раз."
    : error;

  const isPaid = order?.status === ORDER_STATUS.PAID;

  useEffect(() => {
    let cancelled = false;
    let intervalId: NodeJS.Timeout | null = null;

    async function tick() {
      if (!orderId) return;
      const res = await getOrderById(orderId);
      if (cancelled) return;

      if (!res.success) {
        setError(res.error ?? "Не удалось получить заказ");
        return;
      }

      setError(null);
      setOrder(res.data);

      if (res.data.status === ORDER_STATUS.PAID && !clearedRef.current) {
        clearedRef.current = true;
        cancelled = true;
        if (intervalId !== null) clearInterval(intervalId);

        clearCart();
      }
    }

    tick();

    if (isPaid) return;

    intervalId = setInterval(tick, 1500);

    return () => {
      cancelled = true;
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [orderId, clearCart, isPaid]);

  if (derivedError) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Проверка оплаты</h1>
        <ErrorMessage error={derivedError} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Проверяем оплату…</h1>
        <p className="opacity-80">Загружаем данные заказа…</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{isPaid ? "Оплата прошла" : "Проверяем оплату…"}</h1>
        <div className="text-sm opacity-80">
          <OrderTextItem title={"asdas"}>dasdsad</OrderTextItem>
          <p>
            Заказ№: <span>{order.id}</span>
          </p>
          <p>Статус: {order.status}</p>
          <p>Сумма: {formatRub(order.amountTotal)}₽</p>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Состав заказа</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-3 border rounded-lg p-3">
              <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <p className="text-sm opacity-80">
                  Размер: {item.sizeName} · Кол-во: {item.qty}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">{formatRub(item.priceEach)} ₽</div>
                <div className="font-semibold">{formatRub(item.amountLine)} ₽</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 text-sm opacity-80">
        <div>Имя: {order.customerName ?? "-"}</div>
        <div>Телефон: {order.phone ?? "-"}</div>
        <div>Email: {order.email ?? "-"}</div>
        <div>
          Доставка: {order.deliveryType ?? "-"}
          {order.deliveryType !== "pickup" && (
            <>
              {" "}
              · {order.city ?? "-"}, {order.addressLine ?? "-"}{" "}
              {order.postalCode ? `(${order.postalCode})` : ""}
            </>
          )}
        </div>
      </div>

      {order.lastPayment && (
        <div className="text-sm opacity-80">
          Платёж: <span className="font-mono">{order.lastPayment.status}</span> ·{" "}
          {formatRub(order.lastPayment.amount)} ₽
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          На главную
        </Button>
        <Button variant="secondary" onClick={() => (window.location.href = "/catalog")}>
          В каталог
        </Button>
      </div>
    </div>
  );
}
