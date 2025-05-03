import { Skeleton } from "@/components/ui/skeleton";

export function SearchPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Mobile Filters Button */}
      <div className="mb-8">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="hidden md:block w-64 space-y-4">
          <Skeleton className="h-6 rounded w-1/3" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 rounded w-3/4" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Header controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Skeleton className="h-4 rounded w-1/3" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 rounded w-36" />
              <div className="flex border rounded-md">
                <Skeleton className="h-8 w-8 rounded-l-md" />
                <Skeleton className="h-8 w-8 rounded-r-md" />
              </div>
            </div>
          </div>

          {/* No results or grid/list skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square rounded-md" />
                <Skeleton className="h-4 rounded w-3/4" />
                <Skeleton className="h-4 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
