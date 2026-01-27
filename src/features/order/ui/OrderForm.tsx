"use client";

import { Button, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OrderFormSchema, orderFormSchema } from "../model/schema";
import { IOrderFormData } from "../model/types";
import { OrderFormRadio } from "./OrderFormRadio";

interface IOrderFormProps {
  onSubmit: (data: IOrderFormData) => void;
  isSubmitting?: boolean;
}

export function OrderForm({ onSubmit, isSubmitting = false }: IOrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      deliveryMethod: "courier",
      paymentMethod: "card",
      comment: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Контактная информация</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="Имя"
            required
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="tel"
            id="phone"
            label="Телефон"
            required
            placeholder="+7 (___) ___-__-__"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            type="email"
            id="email"
            label="Email"
            required
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Адрес доставки</h2>

        <Input
          id="city"
          label="Город"
          required
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          id="address"
          label="Адрес"
          required
          placeholder="Улица, дом, квартира"
          {...register("address")}
          error={errors.address?.message}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Способ доставки</h2>
        <div className="space-y-2">
          <OrderFormRadio
            {...register("deliveryMethod")}
            value="courier"
            label="Курьером"
            description="Доставка по городу 1-2 дня"
          />
          <OrderFormRadio
            {...register("deliveryMethod")}
            value="post"
            label="Почтой России"
            description="Доставка 5-14 дней"
          />
          <OrderFormRadio
            {...register("deliveryMethod")}
            value="pick"
            label="Самовывоз"
            description="Доставка по городу 1-2 дня"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Способ оплаты</h2>
        <div className="space-y-2">
          <OrderFormRadio {...register("paymentMethod")} value="card" label="Картой онлайн" />
          <OrderFormRadio {...register("paymentMethod")} value="online" label="Онлайн-платеж" />
          <OrderFormRadio
            {...register("paymentMethod")}
            value="cash"
            label="Наличными при получении"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Комментарий к заказу</h2>

        <textarea
          {...register("comment")}
          rows={4}
          placeholder="Дополнительная информация для курьера или магазина"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Оформление..." : "Оформить заказ"}
      </Button>
    </form>
  );
}
