"use client";

import { ICartItem } from "@/entities/cart";
import { createOrder, DELIVERY_TYPE, PAYMENT_METHOD } from "@/entities/order";
import { createPayment } from "@/entities/payment";
import { Button, ErrorMessage, Input, TextArea } from "@/shared/ui";
import { MaskedInput } from "@/shared/ui/Controls";
import { LoadingLayout } from "@/shared/ui/Layouts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { createOrderFormSchema, TCreateOrderForm } from "../model/formSchema";
import { OrderFormRadio } from "./OrderFormRadio";

interface IOrderFormProps {
  items: ICartItem[];
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export function OrderForm({ items, totalItems, totalPrice }: IOrderFormProps) {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TCreateOrderForm>({
    resolver: zodResolver(createOrderFormSchema),
    shouldUnregister: true,
    defaultValues: {
      phone: "",
      deliveryType: DELIVERY_TYPE.COURIER,
      paymentMethod: PAYMENT_METHOD.CARD,
    },
  });

  const deliveryType = useWatch({ control, name: "deliveryType" });
  const showAddress = deliveryType !== DELIVERY_TYPE.PICKUP;

  const onSubmit = async (formData: TCreateOrderForm) => {
    setError(null);
    const orderData = {
      ...formData,
      items: items.map((item) => ({
        sizeId: item.size.id,
        qty: item.quantity,
      })),
      totalPrice,
      totalItems,
    };

    const res = await createOrder(orderData);

    if (!res.success) {
      setError(res.error);
      return;
    }

    const paymentResult = await createPayment(res.data);

    if (!paymentResult.success) {
      setError(paymentResult.error);
      return;
    }

    setRedirectUrl(paymentResult.data.confirmationUrl);
  };

  useEffect(() => {
    if (redirectUrl) {
      window.location.replace(redirectUrl);
    }
  }, [redirectUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <LoadingLayout isLoading={isSubmitting} />
      <fieldset disabled={isSubmitting} className="space-y-4">
        {error && <ErrorMessage error={error} />}
        <h2 className="text-xl font-semibold">Контактная информация</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="customerName"
            label="Имя"
            required
            {...register("customerName")}
            error={errors.customerName?.message}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedInput
                id="phone"
                mask="+{7} (000) 000-00-00"
                value={field.value ?? ""}
                onAccept={(value) => field.onChange(value)}
                inputRef={field.ref}
                required
                type="tel"
                label="Телефон"
                placeholder="+7 (___) ___-__-__"
                error={errors.phone?.message}
              />
            )}
          />
          <Input id="email" label="Email" {...register("email")} error={errors.email?.message} />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Способ получения</h2>
          <div className="space-y-2">
            <OrderFormRadio
              {...register("deliveryType")}
              value={DELIVERY_TYPE.COURIER}
              label="Курьером"
              description="Доставка по городу 1-2 дня"
            />
            <OrderFormRadio
              {...register("deliveryType")}
              value={DELIVERY_TYPE.POST}
              label="Почтой России"
              description="Доставка 5-14 дней"
            />
            <OrderFormRadio
              {...register("deliveryType")}
              value={DELIVERY_TYPE.PICKUP}
              label="Самовывоз"
            />
          </div>
        </div>
        {showAddress && (
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
              id="addressLine"
              label="Адрес"
              required
              placeholder="Улица, дом, квартира"
              {...register("addressLine")}
              error={errors.addressLine?.message}
            />
          </div>
        )}
        {/* <div className="space-y-4">
          <h2 className="text-xl font-semibold">Способ оплаты</h2>
          <div className="space-y-2">
            <OrderFormRadio {...register("paymentMethod")} value={PAYMENT_METHOD.CARD} label="Картой онлайн" />
            <OrderFormRadio {...register("paymentMethod")} value={PAYMENT_METHOD.CARD} label="Онлайн-платеж" />
            <OrderFormRadio
              {...register("paymentMethod")}
              value="cash"
              label="Наличными при получении"
            />
          </div>
        </div> */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Комментарий к заказу</h2>
          <TextArea id="comment" {...register("comment")} />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}>
          {isSubmitting ? "Оформление..." : "Оформить заказ"}
        </Button>
      </fieldset>
    </form>
  );
}
