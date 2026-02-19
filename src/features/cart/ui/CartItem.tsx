"use client";

import { ICartItem } from "@/entities/cart";
import { DeleteButton, IconButton } from "@/shared/ui";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../entities/cart/model/cartStore";

interface ICartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: ICartItemProps) {
  const { updateQuantity, removeItem, closeCart } = useCartStore((state) => state);

  const handleIncrement = () => {
    updateQuantity(item.id, item.size.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.size.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id, item.size.id);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
      <Link href={`/products/${item.slug}`} className="shrink-0" onClick={closeCart}>
        <div className="relative w-25 h-25 overflow-hidden rounded-lg">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="100px" />
        </div>
      </Link>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-semibold hover:underline"
              onClick={closeCart}>
              {item.title}
            </Link>
            <p className="text-sm text-gray-500">Размер: {item.size.name}</p>
          </div>
          <DeleteButton onClick={handleRemove} />
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded">
            <IconButton icon={Minus} onClick={handleDecrement} />
            <span className="px-3 font-medium min-w-8 text-center">{item.quantity}</span>
            <IconButton icon={Plus} onClick={handleIncrement} />
          </div>
          <p className="font-semibold">{item.price * item.quantity} ₽</p>
        </div>
      </div>
    </div>
  );
}
