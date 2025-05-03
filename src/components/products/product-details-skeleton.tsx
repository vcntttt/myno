import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProductDetail() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumbs */}
      <nav className="flex space-x-2">
        <Skeleton className="h-4 rounded w-12" />
        <Skeleton className="h-4 rounded w-4" />
        <Skeleton className="h-4 rounded w-16" />
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen */}
        <div>
          <Skeleton className="aspect-square rounded-lg" />
        </div>

        {/* Info */}
        <div className="space-y-4">
          {/* Título */}
          <Skeleton className="h-8 rounded w-2/3" />

          {/* Precio + stock */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 rounded w-1/4" />
            <Skeleton className="h-4 rounded w-1/6" />
          </div>

          <Separator />

          {/* Descripción (varias líneas) */}
          <div className="space-y-2">
            <Skeleton className="h-4 rounded w-full" />
            <Skeleton className="h-4 rounded w-5/6" />
            <Skeleton className="h-4 rounded w-4/6" />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Skeleton className="h-10 rounded w-full sm:w-1/2" />
            <Skeleton className="h-10 rounded w-10" />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="space-y-4">
        <Skeleton className="h-6 rounded w-1/3" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-t-md pt-0">
              <CardHeader className="px-0 md:px-0">
                <Skeleton className="h-32 w-full rounded-md" />
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 md:space-x-2">
                <Skeleton className="h-4 rounded w-3/4" />
                <Skeleton className="h-4 rounded w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
