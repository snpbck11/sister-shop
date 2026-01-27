import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ICart, ICartItem } from "./types";

interface ICartStore extends ICart {
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (item: Omit<ICartItem, "quantity">) => void;
  removeItem: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const emptyCart: ICart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function calculateTotals(items: ICartItem[]): Pick<ICart, "totalItems" | "totalPrice"> {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      ...emptyCart,
      isOpen: false,
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      addItem: (newItem) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.id === newItem.id && item.size === newItem.size,
        );

        let updatedItems: ICartItem[];

        if (existingIndex !== -1) {
          updatedItems = [...items];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + 1,
          };
        } else {
          updatedItems = [...items, { ...newItem, quantity: 1 }];
        }

        const totals = calculateTotals(updatedItems);
        set({
          items: updatedItems,
          ...totals,
          isOpen: true,
        });
      },

      removeItem: (id, size) => {
        const { items } = get();
        const updatedItems = items.filter((item) => !(item.id === id && item.size === size));
        const totals = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          ...totals,
        });
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity } : item,
        );
        const totals = calculateTotals(updatedItems);

        set({
          items: updatedItems,
          ...totals,
        });
      },

      clearCart: () => {
        set(emptyCart);
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "choker-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
