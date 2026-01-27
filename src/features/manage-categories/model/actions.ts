"use server";

import { createCategory, deleteCategory, updateCategory } from "@/entities/category";
import { ICreateCategoryData, IUpdateCategoryData } from "@/entities/category/model/types";
import { isPrismaUniqueError } from "@/shared/lib/prisma";
import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";
import { createCategorySchema, updateCategorySchema } from "./schema";

export async function createCategoryAction(data: unknown) {
  const parsed = createCategorySchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Ошибка валидации" };
  }

  const { name, description } = parsed.data;
  const slug = slugify(name);

  const createCategoryData: ICreateCategoryData = { name, description, slug };

  try {
    await createCategory(createCategoryData);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: unknown) {
    console.error("Ошибка при создании категории:", error);

    if (isPrismaUniqueError(error)) {
      return { error: "Категория с таким slug уже существует" };
    }

    return { error: "Не удалось создать категорию" };
  }
}

export async function updateCategoryAction(input: unknown) {
  const parsed = updateCategorySchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Ошибка валидации",
    };
  }

  const { id, name, description } = parsed.data;

  const updateCategoryData: IUpdateCategoryData = {
    id,
    ...(name !== undefined ? { name, slug: slugify(name) } : {}),
    ...(description !== undefined ? { description } : {}),
  };

  try {
    await updateCategory(updateCategoryData);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Не удалось обновить категорию" };
  }
}

export async function deleteCategoryAction(id: number) {
  try {
    await deleteCategory(id);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при удалении категории:", error);
    return { error: "Не удалось удалить категорию" };
  }
}
