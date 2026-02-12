import { cn } from "@/shared/lib/cn";

export const iconClass = (isActive: boolean) =>
  cn(
    "transition-colors duration-300",
    isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-600",
  );
