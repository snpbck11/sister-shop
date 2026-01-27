export interface ICartItem {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: number;
  size: string;
  sizeValue: number;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
