import { prisma } from "@/shared/lib/prisma";

export interface ICreateProductData {
  slug: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  collections: string[];
  categoryId?: number;
}

export interface IUpdateProductData extends Partial<ICreateProductData> {
  id: number;
}

export async function createProduct(data: ICreateProductData) {
  const product = await prisma.product.create({
    data: {
      ...data,
      collections: data.collections
        ? {
            create: data.collections.map((slug) => ({
              collection: {
                connect: { slug },
              },
            })),
          }
        : undefined,
    },
    include: {
      collections: {
        include: {
          collection: true,
        },
      },
      category: true,
    },
  });

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  };
}

export async function updateProduct(data: IUpdateProductData) {
  const { id, collections, ...updateData } = data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      collections: collections
        ? {
            deleteMany: {},
            create: collections.map((slug) => ({
              collection: {
                connect: { slug },
              },
            })),
          }
        : undefined,
    },
    include: {
      collections: {
        include: {
          collection: true,
        },
      },
      category: true,
    },
  });

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  };
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });

  return { success: true };
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      collections: {
        include: {
          collection: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      collections: {
        include: {
          collection: true,
        },
      },
      category: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  };
}

export async function getRecommendedProducts(productId: number) {
  const currentProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { categoryId: true },
  });

  if (!currentProduct) return [];

  const recommendedProducts = await prisma.product.findMany({
    where: {
      id: { not: productId },
      ...(currentProduct.categoryId && { categoryId: currentProduct.categoryId }),
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return recommendedProducts.map((product) => ({
    slug: product.slug,
    image: product.image,
    hoverImage: product.hoverImage,
    title: product.title,
    price: product.price,
  }));
}
