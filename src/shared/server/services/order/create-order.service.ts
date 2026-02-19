import {
  createOrderSchema,
  ICreateOrderResult,
  ICreateOrderWithItemsParams,
} from "@/entities/order";
import type { ApiResponse } from "@/shared/api/http/types";
import { parseOrFail } from "@/shared/server/lib";
import { getSizesByIds } from "../../db";
import { createOrderWithItems } from "../../db/repos/order";

export async function createOrderService(body: unknown): Promise<ApiResponse<ICreateOrderResult>> {
  const parsed = parseOrFail(createOrderSchema, body);
  if (!parsed.success) return parsed;

  const input = parsed.data;

  const sizeIds = input.items.map((i) => i.sizeId);

  const sizes = await getSizesByIds(sizeIds);

  const byId = new Map(sizes.map((s) => [s.id, s]));
  const missing = sizeIds.filter((id) => !byId.has(id));
  if (missing.length) {
    return {
      success: false,
      error: `Некоторые варианты не найдены (sizeId): ${missing.join(", ")}`,
    };
  }

  const qtyBySizeId = new Map<number, number>();
  for (const item of input.items) {
    qtyBySizeId.set(item.sizeId, (qtyBySizeId.get(item.sizeId) ?? 0) + item.qty);
  }

  let amountTotal = 0;

  const orderItemsData = Array.from(qtyBySizeId.entries()).map(([sizeId, qty]) => {
    const s = byId.get(sizeId)!;

    const priceEach = s.price;
    const amountLine = priceEach * qty;
    amountTotal += amountLine;

    return {
      productId: s.productId,
      sizeId: s.id,
      qty,
      priceEach,
      amountLine,
      titleSnapshot: s.product.title,
      sizeNameSnapshot: s.name,
    };
  });

  if (amountTotal <= 0) {
    return { success: false, error: "Стоимость заказа не может быть 0 или меньше" };
  }

  const createOrderData: ICreateOrderWithItemsParams = {
    amountTotal,
    currency: "RUB",
    customerName: input.customerName,
    phone: input.phone,
    email: input.email ?? null,
    deliveryType: input.deliveryType,
    addressLine: input.deliveryType === "pickup" ? null : (input.addressLine ?? null),
    city: input.deliveryType === "pickup" ? null : (input.city ?? null),
    comment: input.comment ?? null,
    items: orderItemsData,
  };

  const created = await createOrderWithItems(createOrderData);

  return { success: true, data: { orderId: created.id } };
}
