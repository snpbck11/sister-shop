export { ProductCard } from "./ui/ProductCard";
export { ProductGallery } from "./ui/ProductGallery";

export { createProduct, deleteProduct, patchProduct } from "./api/client";

export type {
  IProduct,
  IProductWithRelations,
  IUpdateProductData,
  TProductUpdatebleFields
} from "./model/types";

export { createProductSchema, updateProductSchema } from "./model/schema";
export type { TCreateProductInput, TUpdateProductInput } from "./model/schema";

