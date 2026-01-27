import { cn } from "@/shared/lib/cn";
import Link, { LinkProps } from "next/link";
import {
  commonButtonStyles,
  sizeStyles,
  TButtonSize,
  TButtonVariant,
  variantStyles,
} from "./shared/buttonStyles";

interface IButtonLinkProps extends LinkProps {
  text: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  href: string;
  className?: string;
}

export function ButtonLink({
  text,
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: IButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(commonButtonStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}>
      <span className="relative z-10 text-nowrap">{text}</span>
    </Link>
  );
}
