"use client";
import { ProductCard } from "@/components/products/product-card";
import { useProducts } from "@/hooks/query/products";

export default function Home() {
  const { data } = useProducts();

  return (
    <>
      <h2 className="mb-6 text-xl font-medium">Nuestras recomendaciones</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data?.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
}
