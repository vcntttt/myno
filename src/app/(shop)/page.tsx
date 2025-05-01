import { ProductGrid } from "@/components/products/product-grid";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <h2 className="mb-6 text-xl font-medium">Nuestras recomendaciones</h2>
      <Suspense fallback={<SkeletonProductGrid />}>
        <ProductGrid />
      </Suspense>
    </>
  );
}
