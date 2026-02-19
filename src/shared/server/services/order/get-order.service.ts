import { IOrderWithDetails } from "@/entities/order";
import type { ApiResponse } from "@/shared/api/http/types";
import { findOrderWithItemsById } from "@/shared/server/db/repos/order";

export async function getOrderByIdService(
  orderId: string,
): Promise<ApiResponse<IOrderWithDetails>> {
  const order = await findOrderWithItemsById(orderId);

  if (!order) return { success: false, error: "Заказ не найден" };

  const lastPayment = order.payments[0] ?? null;

  return {
    success: true,
    data: {
      id: order.id,
      status: order.status,
      currency: order.currency,
      amountTotal: order.amountTotal,
      customerName: order.customerName ?? null,
      phone: order.phone ?? null,
      email: order.email ?? null,
      deliveryType: order.deliveryType ?? null,
      addressLine: order.addressLine ?? null,
      city: order.city ?? null,
      postalCode: order.postalCode ?? null,
      comment: order.comment ?? null,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
      items: order.items.map((it) => ({
        id: it.id,
        productId: it.productId,
        productSlug: it.product.slug,
        title: it.titleSnapshot ?? it.product.title,
        image: it.product.image,
        sizeId: it.sizeId,
        sizeName: it.sizeNameSnapshot ?? it.size.name,
        qty: it.qty,
        priceEach: it.priceEach,
        amountLine: it.amountLine,
      })),
      lastPayment: lastPayment
        ? {
            id: lastPayment.id,
            status: lastPayment.status,
            provider: lastPayment.provider,
            amount: lastPayment.amount,
            currency: lastPayment.currency,
            createdAt: lastPayment.createdAt.toISOString(),
          }
        : null,
    },
  };
}
