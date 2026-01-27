import { prisma } from "@/shared/lib/prisma";

export async function getCollectionWithProducts(slug: string) {
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!collection) return null;

  if (slug === "all-designs") {
    const products = await prisma.product.findMany();

    return {
      collection,
      products,
    };
  }

  return {
    collection,
    products: collection.products.map((pc) => pc.product),
  };
}

export async function upsertCollection(data: { slug: string; name: string; description: string }) {
  return await prisma.collection.upsert({
    where: { slug: data.slug },
    update: {
      name: data.name,
      description: data.description,
    },
    create: {
      slug: data.slug,
      name: data.name,
      description: data.description,
    },
  });
}

export async function deleteCollection(slug: string) {
  try {
    await prisma.collection.delete({
      where: { slug },
    });
    return true;
  } catch {
    return false;
  }
}
