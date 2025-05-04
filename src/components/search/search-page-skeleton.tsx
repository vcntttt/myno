import { Skeleton } from "@/components/ui/skeleton";
import { SearchFiltersSkeleton } from "./filters-skeleton";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";

export function SearchPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Mobile filters button placeholder */}
      <div className="mb-8 flex gap-2 md:hidden">
        <Skeleton className="h-8 w-24 rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar placeholder */}
        <aside className="hidden md:block w-64">
          <SearchFiltersSkeleton />
        </aside>

        {/* Main content placeholder */}
        <main className="w-full space-y-6">
          {/* Header controls placeholder */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-4 w-1/3 rounded" />
            <div className="flex items-center gap-4">
              <div className="h-8 w-36 rounded" />
              <div className="flex border rounded-md">
                <Skeleton className="h-8 w-8 rounded-l-md" />
                <Skeleton className="h-8 w-8 rounded-r-md" />
              </div>
            </div>
          </div>

          <SkeletonProductGrid />
        </main>
      </div>
    </div>
  );
}
