export { ProductCard } from "./ui/ProductCard";
export { ProductGallery } from "./ui/ProductGallery";

export {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  getRecommendedProducts,
  updateProduct
} from "./api/productApi";

export type { ICreateProductData, IUpdateProductData } from "./api/productApi";
export type { IProduct, IProductWithRelations } from "./model/types";

