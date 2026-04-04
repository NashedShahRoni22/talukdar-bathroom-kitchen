export default function ProductListCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#1c2444] dark:bg-[#0a0f2e] animate-pulse">
      <div className="flex items-stretch">
        {/* Image skeleton */}
        <div className="relative w-28 shrink-0 bg-gray-200 dark:bg-[#1c2444] sm:w-44 md:w-56" />

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-5">
          {/* Title skeleton */}
          <div className="min-w-0">
            <div className="h-4 bg-gray-200 dark:bg-[#1c2444] rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-[#1c2444] rounded mb-2 w-1/2" />
            
            {/* Description skeleton */}
            <div className="mt-2 space-y-1">
              <div className="h-3 bg-gray-200 dark:bg-[#1c2444] rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-[#1c2444] rounded w-5/6" />
            </div>
          </div>

          {/* Price and Button skeleton */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-6 bg-gray-200 dark:bg-[#1c2444] rounded w-1/4" />
            <div className="h-10 bg-gray-300 dark:bg-[#2a3460] rounded-lg w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
