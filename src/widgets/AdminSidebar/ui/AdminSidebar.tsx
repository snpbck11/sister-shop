"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const navItems = [
  { href: "/admin", label: "Главная", icon: Home },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: ShoppingBag },
  { href: "/admin/orders", label: "Заказы", icon: Users },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Админ панель</h1>
      </div>

      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}>
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
