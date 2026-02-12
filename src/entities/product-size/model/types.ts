export interface IProductSize {
  id: number;
  productId: number;
  name: string;
  description: string | null;
  price: number;
}

export interface ICreateProductSize extends Pick<IProductSize, "description" | "name" | "price"> {}
export interface IUpdateProductSize extends Partial<ICreateProductSize> {
  id: number;
}
