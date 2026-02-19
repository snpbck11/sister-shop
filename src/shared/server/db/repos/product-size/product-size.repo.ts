import { prisma } from "@/shared/server/prisma";

export async function getSizesByIds(sizeIds: number[]) {
  return await prisma.productSize.findMany({
    where: { id: { in: sizeIds } },
    select: {
      id: true,
      price: true,
      name: true,
      productId: true,
      product: { select: { title: true } },
    },
  });
}
