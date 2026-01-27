import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Заказ оформлен!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.
        <br />В ближайшее время с вами свяжется менеджер для уточнения деталей доставки.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ButtonLink href={ROUTES.collections.allDesigns} text="Продолжить покупки" />
        <ButtonLink href={ROUTES.home} variant="secondary" text="На главную" />
      </div>
    </div>
  );
}
