import { cn } from "@/shared/lib/cn";
import Link from "next/link";

interface ILogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizeStyles = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export function Logo({ className, size = "lg", href = "/" }: ILogoProps) {
  return (
    <Link href={href} className="flex gap-2 items-center">
      <h1 className={cn("font-bold uppercase", sizeStyles[size], className)}>CHOKER TYUMEN</h1>
      <div className="logo-icon" />
    </Link>
  );
}
