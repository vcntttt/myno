import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";

export default function Loading() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-medium">Nuestras recomendaciones</h2>
      <SkeletonProductGrid />
    </div>
  );
}
