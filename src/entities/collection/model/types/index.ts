export interface ICollection {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface ICreateCollectionData extends Pick<
  ICollection,
  "name" | "description" | "slug" | "image"
> {}

export interface ICreateCollecionDTO extends Omit<ICreateCollectionData, "slug"> {}

export type TCollectionUdpatebleFields = keyof Pick<ICollection, "name" | "description" | "image">;

export interface IUpdateCollectionData extends Partial<ICreateCollectionData> {
  id: number;
}

export interface ICollectionWithCount extends ICollection {
  _count: {
    products: number;
  };
}
