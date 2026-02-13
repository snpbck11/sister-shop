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

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
    },
  });
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

export async function getCategoryImage(id: number): Promise<string | null> {
  const category = await prisma.category.findUnique({
    where: { id },
    select: { image: true },
  });

  return category?.image ?? null;
}
