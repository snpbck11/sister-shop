import { cn } from "@/shared/lib/cn";

export const linkStyle = (isActive: boolean) =>
  cn(
    "inline-block text-xs uppercase py-4 cursor-pointer",
    "tracking-widest transition-colors",
    "relative",
    "after:content-[''] after:absolute after:bottom-0 after:left-0",
    "after:w-full after:h-0.5 after:bg-foreground",
    "after:scale-x-0 after:origin-left",
    "after:transition-transform after:duration-300 after:ease-out",
    "hover:after:scale-x-100",
    isActive && "after:scale-x-100",
  );
