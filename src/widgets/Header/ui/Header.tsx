import { Cart } from "@/features/cart";
import { Logo } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { categoriesLinks, collectionsLinks, helpLinks } from "../lib/constants";
import { DopdownMenuColumn } from "./DopdownMenuColumn";
import { HeaderDropdown } from "./HeaderDropdown";
import { HeaderLink } from "./HeaderLink";
import { HeaderMenu } from "./HeaderMenu";

export function Header() {

  return (
    <header className="sticky top-0 left-0 z-50 h-(--header-height) flex justify-between items-center px-5 lg:px-7.5 bg-background border-b border-b-black/8 dark:border-b-white/[0.145]">
      <div className="grow shrink-0 basis-0">
        <nav className="hidden lg:block">
          <ul className="flex gap-3">
            <li>
              <HeaderLink href={"/"} title="Главная" />
            </li>
            <li>
              <HeaderDropdown title="Магазин" className="w-full left-0">
                <div className="flex gap-10 justify-center px-10 py-4 w-full">
                  <div className="flex gap-20">
                    <DopdownMenuColumn title={"Коллекции"} items={collectionsLinks} />
                    <DopdownMenuColumn title={"Категории"} items={categoriesLinks} />
                  </div>
                  <div className="border-l border-l-foreground h-50"></div>
                  <p className="font-bold text-foreground xl:max-w-90 md:max-w-60 text-center">
                    Для тех, кто не выбирает посредственное. Оригинальные украшения ограниченного
                    выпуска, созданные вне массового производства и с вниманием к деталям. Мы
                    работаем с небольшими сериями, чтобы сохранить индивидуальность каждого изделия.
                  </p>

                  <Link href={"/collections/releases"}>
                    <div className="relative overflow-hidden group">
                      <Image
                        src={"/chokers.png"}
                        alt={"Новые изделия"}
                        width={444}
                        height={333}
                        className="object-contain  group-hover:scale-110 duration-4000 transition-transform"
                      />
                    </div>
                    <p className="uppercase text-golden tracking-widest mt-5 text-center">
                      Новые изделия
                    </p>
                  </Link>
                </div>
              </HeaderDropdown>
            </li>
            <li>
              <HeaderLink href="/collections/bestsellers" title="Бестселлеры" />
            </li>
            <li>
              <HeaderLink href="/reviews" title="Отзывы" />
            </li>
            <li>
              <HeaderDropdown title="Помощь" className="p-4 border">
                <DopdownMenuColumn items={helpLinks} />
              </HeaderDropdown>
            </li>
          </ul>
        </nav>
        <HeaderMenu className="lg:hidden" />
      </div>
      <Logo />
      <div className="grow shrink-0 basis-0 flex justify-end">
        <Cart />
      </div>
    </header>
  );
}
