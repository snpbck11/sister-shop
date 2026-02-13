import { IStorefrontProductsPage } from "@/entities/product";

export interface IStorefrontCategory {
  name: string;
  description: string;
}
export type ICategoryPage = {
  category: IStorefrontCategory;
  products: IStorefrontProductsPage;
};
