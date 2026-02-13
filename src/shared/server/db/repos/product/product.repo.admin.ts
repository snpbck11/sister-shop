import type {
  IAdminProductsFilters,
  IAdminProductsPage,
  TAdminProductsSort,
} from "@/entities/product";
import { prisma } from "@/shared/server/prisma";
import type { Prisma } from "@prisma/client";

function buildOrderBy(sort: TAdminProductsSort): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case "createdAt_asc":
      return [{ createdAt: "asc" }, { id: "asc" }];
    case "updatedAt_desc":
      return [{ updatedAt: "desc" }, { id: "desc" }];
    case "updatedAt_asc":
      return [{ updatedAt: "asc" }, { id: "asc" }];
    case "createdAt_desc":
    default:
      return [{ createdAt: "desc" }, { id: "desc" }];
  }
}

function buildWhere(filters?: IAdminProductsFilters): Prisma.ProductWhereInput {
  if (!filters) return {};

  const { q, categoryId, typeId, collectionId, minPrice, maxPrice, createdFrom, createdTo } =
    filters;

  const AND: Prisma.ProductWhereInput[] = [];

  if (q) {
    AND.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
      ],
    });
  }

  if (categoryId !== undefined) AND.push({ categoryId });
  if (typeId !== undefined) AND.push({ typeId });

  if (collectionId !== undefined) {
    AND.push({
      collections: {
        some: { collectionId },
      },
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    AND.push({
      sizes: {
        some: {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        },
      },
    });
  }

  if (createdFrom || createdTo) {
    AND.push({
      createdAt: {
        ...(createdFrom ? { gte: createdFrom } : {}),
        ...(createdTo ? { lte: createdTo } : {}),
      },
    });
  }

  return AND.length ? { AND } : {};
}

export async function getAdminProductsPage(params?: {
  page?: number;
  limit?: number;
  sort?: TAdminProductsSort;
  filters?: IAdminProductsFilters;
}): Promise<IAdminProductsPage> {
  const page = Math.max(params?.page ?? 1, 1);
  const limit = Math.min(Math.max(params?.limit ?? 20, 1), 100);
  const skip = (page - 1) * limit;

  const sort = params?.sort ?? "createdAt_desc";
  const where = buildWhere(params?.filters);
  const orderBy = buildOrderBy(sort);

  const [rows, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        collections: {
          include: {
            collection: { select: { id: true, name: true } },
          },
        },
        category: { select: { id: true, name: true } },
        sizes: true,
        type: { select: { id: true, name: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  const items = rows.map((product) => ({
    ...product,
    collections: product.collections.map((pc) => pc.collection),
  }));

  const pages = Math.max(Math.ceil(total / limit), 1);

  return {
    items,
    meta: { page, limit, total, pages },
  };
}
