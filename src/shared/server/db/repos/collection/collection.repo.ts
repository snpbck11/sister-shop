import { ICreateCollectionData, IUpdateCollectionData } from "@/entities/collection";
import { prisma } from "@/shared/server/prisma";

export async function getCollectionBySlug(slug: string) {
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });

  return collection;
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
