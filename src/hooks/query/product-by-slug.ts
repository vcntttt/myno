import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import products from "@/lib/data/products.json";

async function getProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`/api/products/${slug}`);
  return res.json();
}

export const useProductBySlug = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    initialData: products.find((p) => p.slug === slug),
    queryFn: () => getProductBySlug(slug),
  });

  return { data, isLoading, error };
};
