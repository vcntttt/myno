import { Skeleton } from "@/components/ui/skeleton";

export function SearchFiltersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse w-80">
      <Skeleton className="h-6 w-1/3 rounded" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      ))}
    </div>
  );
}
