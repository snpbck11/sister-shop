import { BadgeCheck, Car, Gem, Hourglass } from "lucide-react";
import { FooterItem } from "./FooterItem";

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-background">
      <ul className="p-6 w-full flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-0 sm:justify-around bg-foreground">
        <li className="sm:w-1/2 md:w-min flex justify-center">
          <FooterItem icon={Car} title="бесплатная доставка по тюмени" />
        </li>
        <li className="sm:w-1/2 md:w-min flex justify-center">
          <FooterItem icon={Gem} title="100% качественные материалы" />
        </li>
        <li className="sm:w-1/2 md:w-min flex justify-center">
          <FooterItem icon={BadgeCheck} title="Гарантия 3 года" />
        </li>
        <li className="sm:w-1/2 md:w-min flex justify-center">
          <FooterItem icon={Hourglass} title="Ограниченная серия. Повторных поставок не будет" />
        </li>
      </ul>
      <div className="flex flex-wrap w-full justify-between py-6 px-12">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold uppercase">CHOKER TYUMEN</h1>
          <p>ссылка на тг допустим?</p>
          <p>ссылка на инсту?</p>
        </div>
        <div className="flex flex-col gap-2 max-w-100">
          <h2 className="text-sm font-semibold uppercase">о нас</h2>
          <p>
            Мне надоело выбирать между безликими аксессуарами массового производства и
            переоценёнными дизайнерскими украшениями — поэтому я нашла золотую середину.
          </p>
          <p className="mt-2">
            Многим из нас не нравится ощущение, что мы носим что-то слишком личное, но созданное для
            всех подряд. Именно поэтому я создаю оригинальные чокеры, браслеты и ожерелья
            ограниченного тиража и предлагаю их только на своём сайте. Это украшения, которые
            ощущаются уникальными и осознанными, выделяются на фоне массового рынка и при этом
            остаются доступными, не теряя чувства эксклюзивности.
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold uppercase mb-4">Контакты</h2>
          <p>Телефон: +7 (999) 999-99-99</p>
          <p>Email: </p>
        </div>
      </div>
      <p className="text-center text-sm text-black/60 dark:text-white/60">
        © 2026 Choker Tyumen. Все права защищены.
      </p>
    </footer>
  );
}
