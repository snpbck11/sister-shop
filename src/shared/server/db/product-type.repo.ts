import { prisma } from "@/shared/server/prisma";

export async function getProductTypes() {
  const types = await prisma.productType.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return types;
}