import { ROUTES } from "@/shared/config/routes";
import { ButtonLink } from "@/shared/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-var(--header-height))] flex items-center justify-center p-4 mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-bold tracking-wider mb-4 bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent animate-pulse">
          404
        </h1>
        <h2 className="text-3xl font-semibold tracking-wide uppercase mb-4">Страница не найдена</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 tracking-wide">
          К сожалению, запрашиваемая страница не существует или была перемещена.
          <br />
          Возможно, вы ищете что-то из наших коллекций?
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <ButtonLink href={ROUTES.home} variant="secondary" text="На главную" />
          <ButtonLink
            href={ROUTES.collections.allDesigns}
            variant="ghost"
            text="Смотреть каталог"
          />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 uppercase tracking-widest">
            Популярные разделы:
          </p>
          <div className="flex gap-6 justify-center text-sm">
            <Link
              href={ROUTES.collections.allDesigns}
              className="hover:underline underline-offset-4 transition-all">
              Все дизайны
            </Link>
            <Link
              href={ROUTES.collections.bestSellers}
              className="hover:underline underline-offset-4 transition-all">
              Лидеры продаж
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
