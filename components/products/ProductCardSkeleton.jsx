export default function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0a0f2e] rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-[#1c2444]" />

      {/* Product Info Skeleton */}
      <div className="p-4">
        {/* Name skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-[#1c2444] rounded mb-4 w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-[#1c2444] rounded mb-6 w-1/2" />

        {/* Price and Button row */}
        <div className="flex items-center justify-between">
          {/* Price skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-[#1c2444] rounded w-1/4" />
          
          {/* Button skeleton */}
          <div className="h-10 bg-gray-300 dark:bg-[#2a3460] rounded-lg w-32" />
        </div>
      </div>
    </div>
  );
}
