import { cn } from "@/shared/lib/cn";

interface ISkeletonProps {
  className?: string;
}
export function Skeleton({ className }: ISkeletonProps) {
  return (
    <div className={cn("w-full animate-pulse rounded bg-black/10 dark:bg-white/10", className)} />
  );
}
