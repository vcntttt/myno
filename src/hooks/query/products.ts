import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

async function getProducts() {
  const res = await fetch("/api/products");
  const data = (await res.json()) as Product[];
  return data;
}

export const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading, error };
};
