import { Skeleton } from "@/components/ui/skeleton";

export function HistoryPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Título */}
      <Skeleton className="h-8 rounded w-1/4" />

      {/* Card principal */}
      <div className="space-y-4 p-4 border rounded-lg">
        {/* Header: título + filtros */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Título + descripción */}
          <div className="space-y-2">
            <Skeleton className="h-6 rounded w-1/3" />
            <Skeleton className="h-4 rounded w-1/4" />
          </div>
          {/* Filtros (botones) */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 rounded w-20" />
            <Skeleton className="h-8 rounded w-20" />
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          {/* Cabecera */}
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-4 rounded" />
            ))}
          </div>
          {/* Filas */}
          <div className="space-y-2 mt-4">
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((__, colIdx) => (
                  <Skeleton key={colIdx} className="h-6 rounded" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
