"use client";

import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function SkeletonProductDetail() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumbs */}
      <nav className="flex space-x-2">
        <div className="h-4 bg-gray-200 rounded w-12" />
        <div className="h-4 bg-gray-200 rounded w-4" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen */}
        <div>
          <div className="aspect-square bg-gray-200 rounded-lg" />
        </div>

        {/* Info */}
        <div className="space-y-4">
          {/* Título */}
          <div className="h-8 bg-gray-200 rounded w-2/3" />

          {/* Precio + stock */}
          <div className="flex items-center space-x-4">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/6" />
          </div>

          <Separator />

          {/* Descripción (varias líneas) */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="h-10 bg-gray-200 rounded w-full sm:w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-10" />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-t-md pt-0">
              <CardHeader className="px-0 md:px-0">
                <div className="h-32 bg-gray-200 w-full rounded-md" />
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0 md:space-x-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
