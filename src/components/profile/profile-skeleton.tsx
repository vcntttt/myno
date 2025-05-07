import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Contenedor principal: dos columnas en desktop */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna de pestañas */}
        <div className="flex-1 space-y-6">
          {/* Tab list */}
          <div className="flex space-x-4">
            <Skeleton className="h-8 rounded w-1/3" />
            <Skeleton className="h-8 rounded w-1/3" />
          </div>
          {/* Tab content */}
          <div className="space-y-4">
            <Skeleton className="h-6 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 rounded w-2/3" />
                <Skeleton className="h-8 rounded w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 rounded w-1/2" />
                <Skeleton className="h-8 rounded w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 rounded w-1/2" />
                <Skeleton className="h-8 rounded w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 rounded w-1/3" />
                <Skeleton className="h-8 rounded w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 rounded w-1/4" />
              <Skeleton className="h-8 rounded w-full" />
            </div>
            <Skeleton className="h-10 rounded w-32" />
          </div>
        </div>

        {/* Columna de perfil (userinfo) */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="h-6 rounded w-1/2 mt-4" />
            <Skeleton className="h-4 rounded w-3/4 mt-2" />
          </div>
          {/* Botones */}
          <div className="space-y-3">
            <Skeleton className="h-10 rounded w-full" />
            <Skeleton className="h-10 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
