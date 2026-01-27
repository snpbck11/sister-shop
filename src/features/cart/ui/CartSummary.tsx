"use client";

import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCartStore } from "../model/cartStore";

export function CartSummary() {
  const { totalItems, totalPrice, closeCart } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Итого</span>
            <span>{totalPrice} ₽</span>
          </div>
        </div>
        <Button
          onClick={handleCheckout}
          variant="primary"
          size="lg"
          className="w-full"
          disabled={totalItems === 0}>
          Оформить заказ
        </Button>
      </motion.div>

      <p className="text-xs text-center text-gray-500">
        Доставка и способы оплаты указываются при оформлении заказа
      </p>
    </div>
  );
}
