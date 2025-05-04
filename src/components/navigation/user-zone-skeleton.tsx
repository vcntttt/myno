import { Skeleton } from "@/components/ui/skeleton";

export function UserZoneSkeleton() {
  return (
    <div className="flex items-center space-x-3">
      {/* Icono circular */}
      <Skeleton className="w-8 h-8  rounded-full animate-pulse" />
      {/* Botones bitones */}
      <Skeleton className="h-6  rounded w-16 animate-pulse" />
      <Skeleton className="h-6  rounded w-16 animate-pulse hidden md:block" />
    </div>
  );
}
