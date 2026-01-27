import { menuLinkStyle } from "@/widgets/Header/lib/menuLinkStyles";
import Link from "next/link";

interface IMenuLinkProps {
  title: string;
  href: string;
  onClick: () => void;
}

export default function MenuLink({ title, href, onClick }: IMenuLinkProps) {
  return (
    <Link
      href={href}
      className={menuLinkStyle}
      onClick={onClick}>
      {title}
    </Link>
  );
}
