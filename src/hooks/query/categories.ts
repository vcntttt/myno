import { Category } from "@/types/categories";
import { useQuery } from "@tanstack/react-query";

async function getCategories(): Promise<{ sections: Category[] }> {
  const res = await fetch("/api/categories");
  return res.json();
}

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { data, isLoading, error };
};
