"use client";

import { ProductCard } from "@/components/products/product-card";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";
import { useRecommendations } from "@/hooks/query/recommendations";
import { useMounted } from "@/hooks/use-mounted";

export default function Home() {
  const mounted = useMounted();
  const { data, isLoading } = useRecommendations({
    enabled: mounted,
  });

  if (isLoading || !data || !mounted) {
    return <SkeletonProductGrid />;
  }

  console.log(data);

  return (
    <div className="space-y-12">
      {/* <h2 className="text-3xl font-semibold">Bienvenido, nombre</h2> */}
      {data.sections.map((sec) => (
        <section key={sec.title}>
          <h2 className="mb-6 text-2xl font-semibold">{sec.title}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sec.products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
