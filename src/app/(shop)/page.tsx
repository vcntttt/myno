"use client";

import { ProductCard } from "@/components/products/product-card";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";
import { Button } from "@/components/ui/button";
import { useRecommendations } from "@/hooks/query/recommendations";
import { useMounted } from "@/hooks/use-mounted";

export default function Home() {
  const mounted = useMounted();
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    isRefetchError,
  } = useRecommendations({
    enabled: mounted,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[80vh]">
        <h1 className="text-2xl font-semibold">
          {isRefetchError
            ? "Fallo al actualizar los productos tras la última carga."
            : "No se pudo obtener los productos. Por favor, intenta más tarde."}
        </h1>

        <Button
          variant="outline"
          className="dark:text-orange-200/90"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Cargando..." : "Intentar nuevamente"}
        </Button>
      </div>
    );
  }

  if (isLoading || !data || !mounted) {
    return <SkeletonProductGrid />;
  }

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
