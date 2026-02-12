import { IProductWithRelations } from "@/entities/product";
import { ICreateProductData, IUpdateProductData } from "@/entities/product/model/types";
import { prisma } from "../prisma";

export async function insertProduct(data: ICreateProductData) {
  const { collections, sizes, ...productData } = data;

  const product = await prisma.product.create({
    data: {
      ...productData,
      collections: {
        create: collections.map((id) => ({
          collection: {
            connect: { id },
          },
        })),
      },
      sizes: {
        create: sizes,
      },
    },
    include: {
      collections: {
        include: {
          collection: {
            select: { id: true, name: true },
          },
        },
      },
      category: {
        select: { id: true, name: true },
      },
      sizes: true,
      type: { select: { id: true, name: true } },
    },
  });

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  };
}

export async function updateProduct(data: IUpdateProductData) {
  const { id, collections, sizes, ...updateData } = data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...updateData,
      collections: collections
        ? {
            deleteMany: {},
            create: collections.map((collectionId) => ({
              collection: {
                connect: { id: collectionId },
              },
            })),
          }
        : undefined,
      sizes: sizes
        ? {
            deleteMany: {},
            create: sizes,
          }
        : undefined,
    },
    include: {
      collections: {
        include: {
          collection: {
            select: { id: true, name: true },
          },
        },
      },
      category: {
        select: { id: true, name: true },
      },
      sizes: true,
      type: { select: { id: true, name: true } },
    },
  });

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  };
}

export async function deleteProductById(id: number) {
  await prisma.product.delete({
    where: { id },
  });

  return { success: true };
}

export async function getProducts(): Promise<IProductWithRelations[]> {
  const products = await prisma.product.findMany({
    include: {
      collections: {
        include: {
          collection: {
            select: { id: true, name: true },
          },
        },
      },
      category: {
        select: { id: true, name: true },
      },
      sizes: true,
      type: {
        select: { id: true, name: true },
      },
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
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      hoverImage: true,
      gallery: true,
      createdAt: true,
      updatedAt: true,

      collections: {
        select: {
          collection: { select: { id: true, name: true } },
        },
      },
      category: { select: { id: true, name: true } },
      sizes: true,
    },
  });

  if (!product) return null;

  return {
    ...product,
    collections: product.collections.map((pc) => pc.collection),
    gallery: [product.image, product.hoverImage, ...product.gallery],
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
    select: {
      slug: true,
      title: true,
      image: true,
      hoverImage: true,
      sizes: {
        select: {
          price: true,
        },
      },
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return recommendedProducts.map((product) => ({
    slug: product.slug,
    title: product.title,
    image: product.image,
    hoverImage: product.hoverImage,
    price: product.sizes.length > 0 ? Math.min(...product.sizes.map((s) => s.price)) : 0,
  }));
}

export async function getProductImageUrls(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      image: true,
      hoverImage: true,
      gallery: true,
    },
  });

  if (!product) return [];

  return [product.image, product.hoverImage, ...product.gallery];
}
