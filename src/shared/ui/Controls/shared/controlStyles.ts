import { cn } from "@/shared/lib/cn";

export const controlStyles = (error?: string) =>
  cn(
    "w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors",
    "border-gray-300 dark:border-gray-600 focus:ring-foreground",
    error && "border-red-500 focus:ring-red-500",
  );
