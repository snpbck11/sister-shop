import { cn } from "@/shared/lib/cn";

export type TButtonVariant = "primary" | "secondary" | "ghost" | "white" | "black" | "danger";
export type TButtonSize = "sm" | "md" | "lg";

export const sizeStyles: Record<TButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const variantStyles: Record<TButtonVariant, string> = {
  primary: cn(
    "before:transform before:scale-x-100",
    "before:bg-foreground",
    "hover:before:scale-x-0",
    "text-white dark:text-black",
    "hover:text-black dark:hover:text-white",
  ),
  secondary: cn(
    "bg-foreground text-background border-foreground",
    "hover:bg-background hover:text-foreground",
    "before:hidden",
  ),
  ghost: cn(
    "before:transform before:scale-x-0",
    "before:bg-foreground",
    "hover:before:scale-x-100",
    "text-black dark:text-white",
    "hover:text-white dark:hover:text-black",
  ),
  white: cn(
    "bg-white text-black border-white",
    "hover:bg-transparent hover:text-white",
    "before:hidden",
  ),
  black: cn("bg-black text-white border-white", "before:hidden"),
  danger: cn(
    "bg-red-600 text-white border-red-600",
    "hover:bg-red-700 hover:border-red-700",
    "before:hidden",
  ),
};

export const commonButtonStyles = cn(
  "inline-block",
  "relative overflow-hidden",
  "border-2 border-black dark:border-white",
  "cursor-pointer",
  "font-medium uppercase tracking-widest",
  "transition-colors duration-300",

  "before:content-[''] before:absolute before:inset-0",
  "before:w-full before:h-full",
  "before:origin-left",
  "before:transition-transform before:duration-500 before:ease-out",
  "before:z-0",
);
