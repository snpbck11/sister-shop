import { ICreateCategoryData, IUpdateCategoryData } from "@/entities/category";
import { prisma } from "@/shared/server/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return categories;
}

export async function getCategoryWithProducts(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          sizes: true,
          collections: {
            include: {
              collection: true,
            },
          },
        },
      },
    },
  });

  if (!category) return null;

  const { products, ...categoryData } = category;

  return {
    category: categoryData, // либо просто category, если тебе ок вместе с products
    products,
  };
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: true,
    },
  });

  return category;
}

export async function insertCategory(data: ICreateCategoryData) {
  const category = await prisma.category.create({
    data,
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return category;
}

export async function updateCategory(data: IUpdateCategoryData) {
  const { id, ...updateData } = data;

  const category = await prisma.category.update({
    where: { id },
    data: updateData,
  });

  return category;
}

export async function deleteCategory(id: number) {
  const count = await prisma.product.count({ where: { categoryId: id } });

  if (count > 0) {
    throw new Error(`Нельзя удалить категорию: к ней привязано товаров: ${count}`);
  }

  await prisma.category.delete({ where: { id } });
}
