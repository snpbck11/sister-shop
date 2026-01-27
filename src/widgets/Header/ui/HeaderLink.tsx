"use client";

import { cn } from "@/shared/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { linkStyle } from "../lib/linkStyles";

interface IHeaderLinkProps {
  href: string;
  title?: string;
}

export function HeaderLink({ href, title }: IHeaderLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={cn(linkStyle(isActive))} href={href}>
      {title}
    </Link>
  );
}
