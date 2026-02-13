"use client";

import { cn } from "@/shared/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IDropdownItem } from "../lib/IDropdownItem";

interface IMenuColumnProps {
  title: string;
  links: IDropdownItem[];
  onClick?: () => void;
}

export default function MenuColumn({ title, links, onClick }: IMenuColumnProps) {
  const pathname = usePathname();
  return (
    <nav className="pl-4 mb-8">
      <h3 className="text-silver text-xl uppercase mb-5">{title}</h3>
      <ul className="flex flex-col gap-2 border-l border-l-foreground pl-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "text-sm",
                pathname.includes(link.href) && "underline underline-offset-4",
              )}
              onClick={onClick}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
