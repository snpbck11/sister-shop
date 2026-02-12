"use client";

import { cn } from "@/shared/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IDropdownItem } from "../lib/IDropdownItem";

interface IDopdownMenuColumnProps {
  title?: string;
  items: IDropdownItem[];
}

export function DopdownMenuColumn({ title, items }: IDopdownMenuColumnProps) {
  const pathname = usePathname();
  return (
    <nav>
      {title && <h3 className="uppercase text-golden tracking-widest mb-5">{title}</h3>}
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "text-sm uppercase tracking-widest",
                "hover:underline underline-offset-4",
                pathname.includes(item.href) && "underline underline-offset-4",
              )}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
