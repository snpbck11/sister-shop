export interface ICategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategoryData extends Pick<ICategory, "name" | "description" | "slug"> {}

export type TUdpatebleFields = keyof Pick<ICategory, "name" | "description">

export interface IUpdateCategoryData extends Partial<ICreateCategoryData> {
  id: number;
}

export interface ICategoryWithCount extends ICategory {
  _count: {
    products: number;
  };
}
