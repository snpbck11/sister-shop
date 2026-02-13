"use client";

import { IStorefrontProductCard } from "@/entities/product";
import { ROUTES } from "@/shared/config/routes";
import useBreakpoint from "@/shared/hooks/useBreakpoint";
import { cn } from "@/shared/lib/cn";
import { Accordion, CloseButton, Drawer } from "@/shared/ui";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IDropdownItem } from "../lib/IDropdownItem";
import { menuLinkStyle } from "../lib/menuLinkStyles";
import MenuColumn from "./MenuColumn";
import MenuLink from "./MenuLink";

interface IHeaderMenuProps {
  className?: string;
  collectionsLinks: IDropdownItem[];
  categoriesLinks: IDropdownItem[];
  recommendedProducts: IStorefrontProductCard[];
}

export function HeaderMenu({
  className,
  categoriesLinks,
  collectionsLinks,
  recommendedProducts,
}: IHeaderMenuProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const breakPoints = useBreakpoint();
  const isDesktop = breakPoints === "desktop";
  const isDrawerOpen = !isDesktop && openDrawer;

  const mappedCategoriesLinks = categoriesLinks.map((l) => ({
    ...l,
    href: `${ROUTES.categories.main}/${l.href}`,
  }));

  const mappedCollectionsLinks = collectionsLinks.map((l) => ({
    ...l,
    href: `${ROUTES.collections.main}/${l.href}`,
  }));

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <div className={cn(className)}>
      <button className="py-2.5 cursor-pointer" onClick={() => setOpenDrawer(true)}>
        <Menu className="w-7 h-7" />
      </button>

      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        drawerClassname="w-full max-w-2xl"
        headerContent={
          <div className="p-4 sticky flex shadow-[0_14px_14px_0px_rgb(255,255,255)] dark:shadow-[0_14px_14px_0px_rgb(0,0,0)]">
            <CloseButton onClick={handleCloseDrawer} buttonClassName="ml-auto " />
          </div>
        }>
        <nav className="px-7.5 pb-10 overflow-auto">
          <ul>
            <li>
              <MenuLink href="/" title="Главная" onClick={handleCloseDrawer} />
            </li>
            <li>
              <Accordion title={<p className={cn("border-none", menuLinkStyle)}>Магазин</p>}>
                <MenuColumn
                  title="Коллекции"
                  links={mappedCollectionsLinks}
                  onClick={handleCloseDrawer}
                />
                <MenuColumn
                  title="Категории"
                  links={mappedCategoriesLinks}
                  onClick={handleCloseDrawer}
                />
              </Accordion>
            </li>
            <li>
              <MenuLink
                href="/collections/bestsellery"
                title="Бестселлеры"
                onClick={handleCloseDrawer}
              />
            </li>
            <li>
              <MenuLink href="/reviews" title="Отзывы" onClick={handleCloseDrawer} />
            </li>

            <li>
              <p className={cn(menuLinkStyle, "border-none")}>*Новинки</p>
              <ul className="flex gap-4 overflow-auto no-scrollbar">
                {recommendedProducts.map((item) => (
                  <li key={item.slug} className="shrink-0">
                    <Link href={`/products/${item.slug}`} onClick={handleCloseDrawer}>
                      <Image
                        alt={item.title}
                        src={item.image}
                        width={400}
                        height={400}
                        quality={100}
                        className="w-50 h-50 object-cover"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}
