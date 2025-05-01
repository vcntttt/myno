"use client";
import { ProductCard } from "@/components/products/product-card";
import { useProducts } from "@/hooks/query/products";

export function ProductGrid() {
  const { data: products } = useProducts();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
