import { IStorefrontProductsPage } from "@/entities/product";

export type IStorefrontCollection = {
  name: string;
  description: string;
};

export type ICollectionPage = {
  collection: IStorefrontCollection;
  products: IStorefrontProductsPage;
};
