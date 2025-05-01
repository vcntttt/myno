import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

async function getProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`/api/products/${slug}`);
  const data = (await res.json()) as Product;
  return data;
}

export const useProductBySlug = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
  });

  return { data, isLoading, error };
};
