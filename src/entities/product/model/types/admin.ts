import { IProductWithRelations } from ".";

export type TAdminProductsSort =
  | "createdAt_desc"
  | "createdAt_asc"
  | "updatedAt_desc"
  | "updatedAt_asc";

export interface IAdminProductsFilters {
  q?: string;
  categoryId?: number;
  typeId?: number;
  collectionId?: number;

  minPrice?: number;
  maxPrice?: number;

  createdFrom?: Date;
  createdTo?: Date;
}

export interface IAdminProductsPage {
  items: IProductWithRelations[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
