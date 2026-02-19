import { IProductSize } from "@/entities/product-size";

export interface ICartItem {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: number;
  size: IProductSize;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
