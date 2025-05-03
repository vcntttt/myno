import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function CartPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Title */}
      <Skeleton className="h-8  rounded w-1/3" />

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products in Cart Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-6  rounded w-1/4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-6">
                <Skeleton className="w-20 h-20  rounded-md flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4  rounded w-1/3" />
                  <Skeleton className="h-4  rounded w-1/4" />
                  <Skeleton className="h-4  rounded w-1/5" />
                  <Skeleton className="h-8 w-24  rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <Skeleton className="h-8 w-32  rounded" />
            <Skeleton className="h-8 w-32  rounded" />
          </div>
        </div>

        {/* Summary Skeleton */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6  rounded w-1/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4  rounded w-1/4" />
                  <Skeleton className="h-4  rounded w-1/5" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4  rounded w-1/4" />
                  <Skeleton className="h-4  rounded w-1/5" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <Skeleton className="h-6  rounded w-1/4" />
                <Skeleton className="h-6  rounded w-1/5" />
              </div>
              <div className="pt-4 space-y-2">
                <Skeleton className="h-10  rounded w-full" />
                <Skeleton className="h-4  rounded w-3/4" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-8 w-32  rounded" />
              <Skeleton className="h-8 w-32  rounded" />
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Related Products Title */}
      <Skeleton className="h-6  rounded w-1/3" />

      {/* Related Products Grid Skeleton */}
      <SkeletonProductGrid />
    </div>
  );
}
