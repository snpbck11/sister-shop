import { ICreateProductSize, IProductSize } from "@/entities/product-size";

interface IRelationInfo {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  slug: string;
  title: string;
  typeId: number;
  categoryId: number;
  description: string | null;
  image: string;
  sizes: IProductSize[];
  hoverImage: string;
  gallery: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TProductUpdatebleFields = keyof IUpdateProductData;

export interface IProductWithRelations extends IProduct {
  category: IRelationInfo;
  collections: IRelationInfo[];
  sizes: IProductSize[];
  type: IRelationInfo;
}

export interface ICreateProductData {
  slug: string;
  title: string;
  typeId: number;
  description: string | null;
  image: string;
  hoverImage: string;
  gallery: string[];
  categoryId: number;
  collections: number[];
  sizes: ICreateProductSize[];
}

export interface IUpdateProductData extends Partial<ICreateProductData> {
  id: number;
}

