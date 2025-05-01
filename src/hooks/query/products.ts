import { Product } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";

async function getProducts() {
  const res = await fetch("/api/products");
  const data = (await res.json()) as Product[];
  return data;
}

export const useProducts = () => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading, error };
};
