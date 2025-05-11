import { Product, ProductSlugResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { tagSimilarity } from "@/lib/utils/recommendations";
import products from "@/lib/data/products.json";

async function getProductBySlug(slug: string) {
  const res = await fetch(`/api/products/${slug}`);
  return (await res.json()) as ProductSlugResponse;
}

export const useProductBySlug = (slug: string) => {
  const product = products.find((p) => p.slug === slug);

  const recommendations = (products as Product[])
    .filter((p) => p.id !== product!.id)
    .map((p) => ({ p, score: tagSimilarity(product!, p) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.p);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    initialData: {
      product,
      recommendations,
    },
    queryFn: () => getProductBySlug(slug),
  });

  return { data, isLoading, error };
};
