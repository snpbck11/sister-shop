import { ICursorFilterParams } from "@/entities/product";
import { prisma } from "@/shared/server/prisma";
import type { Prisma } from "@prisma/client";

function encodeCursor(createdAt: Date, id: number) {
  return Buffer.from(JSON.stringify({ createdAt: createdAt.toISOString(), id }), "utf8").toString(
    "base64",
  );
}

function decodeCursor(cursor: string): { createdAt: Date; id: number } {
  const raw = Buffer.from(cursor, "base64").toString("utf8");
  const parsed = JSON.parse(raw) as { createdAt: string; id: number };

  return {
    createdAt: new Date(parsed.createdAt),
    id: parsed.id,
  };
}

function buildCursorWhere(cursor?: string | null): Prisma.ProductWhereInput | undefined {
  if (!cursor) return undefined;

  const { createdAt, id } = decodeCursor(cursor);

  return {
    OR: [
      { createdAt: { lt: createdAt } },
      {
        createdAt,
        id: { lt: id },
      },
    ],
  };
}

function buildBaseAND(
  params: Pick<ICursorFilterParams, "categorySlug" | "collectionSlug">,
): Prisma.ProductWhereInput[] {
  const AND: Prisma.ProductWhereInput[] = [];

  if (params.categorySlug) {
    AND.push({ category: { slug: params.categorySlug } });
  }

  if (params.collectionSlug) {
    AND.push({
      collections: {
        some: { collection: { slug: params.collectionSlug } },
      },
    });
  }

  return AND;
}

function buildWhereFromAND(AND: Prisma.ProductWhereInput[]): Prisma.ProductWhereInput {
  return AND.length ? { AND } : {};
}

export async function getProductsByCursorFilter(params: ICursorFilterParams) {
  const limit = Math.min(Math.max(params.limit ?? 12, 1), 50);

  const baseAND = buildBaseAND(params);
  const baseWhere = buildWhereFromAND(baseAND);

  const cursorWhere = buildCursorWhere(params.cursor);
  const pageWhere = buildWhereFromAND(cursorWhere ? [...baseAND, cursorWhere] : baseAND);

  const [rows, total] = await prisma.$transaction([
    prisma.product.findMany({
      where: pageWhere,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit + 1,
      select: {
        id: true,
        slug: true,
        title: true,
        typeId: true,
        image: true,
        hoverImage: true,
        createdAt: true,
        sizes: { select: { price: true } },
      },
    }),
    prisma.product.count({ where: baseWhere }),
  ]);

  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit);

  const items = page
    .map((p) => {
      const prices = p.sizes.map((s) => s.price);
      const priceFrom = prices.length ? Math.min(...prices) : 0;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        typeId: p.typeId,
        image: p.image,
        hoverImage: p.hoverImage,
        createdAt: p.createdAt,
        priceFrom,
      };
    })
    .filter((p) => p.priceFrom > 0);

  const last = page[page.length - 1];
  const nextCursor = hasMore && last ? encodeCursor(last.createdAt, last.id) : null;

  return { items, nextCursor, total };
}

export async function getPopularProducts() {
  // подумать как реализовать, добавить стату просмторов на товар?
  const limit = 12;

  const products = await prisma.product.findMany({
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      typeId: true,
      image: true,
      hoverImage: true,
      createdAt: true,
      sizes: { select: { price: true } },
    },
  });

  return products
    .map((p) => {
      const prices = p.sizes.map((s) => s.price);
      const priceFrom = prices.length ? Math.min(...prices) : 0;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        typeId: p.typeId,
        image: p.image,
        hoverImage: p.hoverImage,
        createdAt: p.createdAt,
        priceFrom,
      };
    })
    .filter((p) => p.priceFrom > 0);
}

export async function getRecommendedProducts(productId: number) {
  /// то же что и сверху
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
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return recommendedProducts
    .map((p) => {
      const prices = p.sizes.map((s) => s.price);
      const priceFrom = prices.length ? Math.min(...prices) : 0;

      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        typeId: p.typeId,
        image: p.image,
        hoverImage: p.hoverImage,
        createdAt: p.createdAt,
        priceFrom,
      };
    })
    .filter((p) => p.priceFrom > 0);
}
