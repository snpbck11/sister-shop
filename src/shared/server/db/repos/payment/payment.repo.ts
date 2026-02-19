import { ICreatePaymentData, IUpdatePaymentData } from "@/entities/payment";
import { prisma } from "@/shared/server/prisma";

export async function insertPayment(params: ICreatePaymentData) {
  return await prisma.payment.create({
    data: params,
    select: { id: true, idempotenceKey: true, amount: true, currency: true },
  });
}

export async function updatePayment(id: string, data: IUpdatePaymentData) {
  return await prisma.payment.update({
    where: { id },
    data,
  });
}

export async function findPaymentById(id: string) {
  return prisma.payment.findUnique({ where: { id } });
}

export async function findPaymentByExternalId(externalPaymentId: string) {
  return prisma.payment.findFirst({
    where: { externalPaymentId },
  });
}
