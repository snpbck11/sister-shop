"use client";

import { CloseButton, Drawer } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "../model/cartStore";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const { items, totalItems, isOpen, closeCart } = useCartStore();

  const isEmpty = items.length === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      anchor="right"
      drawerClassname="w-full max-w-md"
      headerContent={
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Корзина {!isEmpty && `(${totalItems})`}</h2>
          <CloseButton onClick={closeCart} />
        </div>
      }>
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}>
            <EmptyCart onCloseCart={closeCart} />
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            className="flex flex-col h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="flex-1 overflow-y-auto px-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, x: -100 }}
                    transition={{ duration: 0.3, layout: { duration: 0.2 } }}
                    key={`${item.id}-${item.size}`}>
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <CartSummary />
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer>
  );
}
