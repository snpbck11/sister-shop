import { Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <div className="w-full mx-auto lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(550px,680px)_minmax(350px,450px)] gap-12 justify-center mb-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <Skeleton className="w-60 h-8 sm:hidden mt-3" />
          <Skeleton className="aspect-square w-full lg:max-w-137.5" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-12.5 h-12.5 sm:w-17 sm:h-17 md:w-20 md:h-20" />
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full max-w-115 gap-2 px-4 mx-auto">
          <Skeleton className="w-full h-8 hidden sm:block" />
          <Skeleton className="w-20 h-8" />
          <div className="flex justify-between">
            <Skeleton className="w-30 h-6" />
            <Skeleton className="w-30 h-6" />
          </div>
          <ul className="grid grid-cols-2 gap-4">
            <li>
              <Skeleton className="w-full h-10" />
            </li>
            <li>
              <Skeleton className="w-full h-10" />
            </li>
            <li>
              <Skeleton className="w-full h-10" />
            </li>
            <li>
              <Skeleton className="w-full h-10" />
            </li>
          </ul>
          <Skeleton className="w-full h-15 mt-6" />
        </div>
      </div>

      <div className="min-h-100 sm:min-h-70 mx-auto py-4 bg-[#f6f6f6] dark:bg-gray-500 flex flex-col items-center">
        <div className="flex w-full gap-6 border-b border-gray-200 dark:border-gray-400 justify-center">
          <Skeleton className="w-30 h-8" />
          <Skeleton className="w-30 h-8" />
          <Skeleton className="w-30 h-8" />
        </div>
      </div>
    </div>
  );
}
