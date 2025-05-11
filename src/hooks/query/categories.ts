import { Category } from "@/types/categories";
import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const res = await fetch("/api/categories");
  const data = (await res.json()) as Category[];
  return data;
}

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { data, isLoading, error };
};
