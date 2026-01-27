export interface IProduct {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  categoryId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductWithRelations extends IProduct {
  collections: Array<{
    id: number;
    slug: string;
    name: string;
    description: string;
  }>;
  category: {
    id: number;
    slug: string;
    name: string;
    description: string;
  } | null;
}
