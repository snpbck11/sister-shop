import { Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="p-2 sm:p-5">
      <Skeleton className="h-4 w-40 mx-auto mb-6" />
      <Skeleton className="h-4 w-60 mx-auto mb-6" />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-20 mb-6" />
        <Skeleton className="h-5 w-20  mb-6" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
