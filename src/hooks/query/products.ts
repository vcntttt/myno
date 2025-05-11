import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  return res.json();
}

export const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isLoading, error };
};
