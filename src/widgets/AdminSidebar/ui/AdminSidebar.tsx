"use client";

import { logout } from "@/entities/auth";
import { cn } from "@/shared/lib/cn";
import { ConfirmModal, Tooltip } from "@/shared/ui";
import { Home, Library, LogOut, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { sideBarLinkStyle } from "../lib/sideBarLinkStyle";

const navItems = [
  { href: "/admin", label: "Главная", icon: Home },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: ShoppingBag },
  { href: "/admin/collections", label: "Коллекции", icon: Library },
  // { href: "/admin/orders", label: "Заказы", icon: Users },
  // { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminSidebar() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout()
    router.push("/login");
  };

  return (
    <aside className="w-12 lg:w-64 flex flex-col bg-admin-sidebar-background border-r border-admin-border">
      <h1 className="text-2xl font-bold p-4 hidden lg:block">Админ панель</h1>
      <nav className="py-2 lg:p-2 flex flex-col flex-1">
        <ul className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Tooltip
                  position="right"
                  content={<span>{item.label}</span>}
                  tooltipClassname="lg:hidden">
                  <Link
                    href={item.href}
                    className={cn(sideBarLinkStyle, isActive && "bg-foreground text-background")}>
                    <Icon className="w-5 h-5" />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                </Tooltip>
              </li>
            );
          })}
        </ul>
        <Tooltip position="right" content={<span>Выйти</span>} tooltipClassname="lg:hidden">
          <button className={sideBarLinkStyle} onClick={() => setOpenLogoutModal(true)}>
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:block">Выйти</span>
          </button>
        </Tooltip>
      </nav>
      <ConfirmModal
        isOpen={openLogoutModal}
        title={"Действительно хотите выйти?"}
        onConfirm={handleLogout}
        onClose={() => setOpenLogoutModal(false)}
      />
    </aside>
  );
}
