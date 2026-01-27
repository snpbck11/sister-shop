import { prisma } from "@/shared/lib/prisma";
import { ICreateCategoryData, IUpdateCategoryData } from "../model/types";

// Получить все категории
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
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: true,
    },
  });

  return category;
}

export async function createCategory(data: ICreateCategoryData) {
  const category = await prisma.category.create({
    data,
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
  await prisma.category.delete({
    where: { id },
  });

  return { success: true };
}
