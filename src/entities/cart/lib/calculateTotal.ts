import { ICart, ICartItem } from "../model/types";

export const calculateTotals = (items: ICartItem[]): Pick<ICart, "totalItems" | "totalPrice"> => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};
