import { ICreateCollectionData, IUpdateCollectionData } from "@/entities/collection";
import { prisma } from "@/shared/server/prisma";

const productInclude = {
  sizes: true,
  collections: {
    include: {
      collection: true,
    },
  },
} as const;

export async function getCollectionWithProducts(slug: string) {
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });

  if (!collection) return null;

  if (slug === "all-designs") {
    const products = await prisma.product.findMany({
      include: productInclude,
    });

    return { collection, products };
  }

  const collectionWithProducts = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: {
            include: productInclude,
          },
        },
      },
    },
  });

  if (!collectionWithProducts) return null;

  return {
    collection: collectionWithProducts,
    products: collectionWithProducts.products.map((pc) => pc.product),
  };
}

export async function getCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return collections;
}

export async function insertCollection(data: ICreateCollectionData) {
  const collection = await prisma.collection.create({
    data,
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return collection;
}

export async function updateCollection(data: IUpdateCollectionData) {
  const { id, ...updateData } = data;

  const collection = await prisma.collection.update({
    where: { id },
    data: updateData,
  });

  return collection;
}

export async function getCollectionById(id: number) {
  return await prisma.collection.findUnique({
    where: { id },
  });
}

export async function deleteCollectionById(id: number) {
  await prisma.collection.delete({
    where: { id },
  });
}

export async function getCollectionImage(id: number): Promise<string | null> {
  const collection = await prisma.collection.findUnique({
    where: { id },
    select: { image: true },
  });

  return collection?.image ?? null;
}
