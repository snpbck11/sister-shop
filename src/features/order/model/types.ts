import { IProduct } from "@/entities/product";

export interface IOrderFormData {
  firstName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryMethod: "pickup" | "courier" | "post";
  paymentMethod: "card" | "cash" | "online";
  comment?: string;
}

export interface IOrderData extends IOrderFormData {
  items: IProduct[];
  totalPrice: number;
  totalItems: number;
}
