"use client";
import { ProductCard } from "@/components/products/product-card";
import { useProducts } from "@/hooks/query/products";
import { SkeletonProductGrid } from "./product-grid-skeleton";

export function ProductGrid() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <SkeletonProductGrid />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
