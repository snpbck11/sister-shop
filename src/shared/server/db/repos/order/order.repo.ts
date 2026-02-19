import {
  ICreateOrderWithItemsParams,
  ORDER_STATUS,
  TOrderStatus,
} from "@/entities/order/model/types";
import { prisma } from "@/shared/server/prisma";

export async function createOrderWithItems(params: ICreateOrderWithItemsParams) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        ...params,
        status: ORDER_STATUS.PENDING_PAYMENT,
        items: { createMany: { data: params.items } },
      },
      select: { id: true },
    });

    return order;
  });
}

export async function findOrderById(orderId: string) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true, amountTotal: true, currency: true },
  });
}

export async function findOrderWithItemsById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
        include: {
          product: { select: { slug: true, image: true, title: true } },
          size: { select: { name: true, price: true } },
        },
      },
      payments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          provider: true,
          amount: true,
          currency: true,
          confirmationUrl: true,
          externalPaymentId: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function updateOrder(id: string, data: { status?: TOrderStatus }) {
  return prisma.order.update({ where: { id }, data });
}
