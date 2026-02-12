import { Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="flex justify-between">
        <Skeleton className="w-40 h-10" />
        <Skeleton className="w-50 h-10" />
      </div>
      <div className="flex flex-col flex-1">
        <Skeleton className="w-full h-13 bg-black/5 dark:bg-white/5" />
        <Skeleton className="w-full flex-1" />
      </div>
    </div>
  );
}
