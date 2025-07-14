import { useUserStore } from "@/store/user";
import { Product } from "@/types/products";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface Section {
  title: string;
  products: Product[];
}

async function getRecommendations(
  email?: string
): Promise<{ sections: Section[] }> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

type RecommendationsData = { sections: Section[] };

type UseRecommendationsOptions = Omit<
  UseQueryOptions<RecommendationsData, Error>,
  "queryKey" | "queryFn"
>;
export const useRecommendations = (options?: UseRecommendationsOptions) => {
  const user = useUserStore((state) => state.user);

  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
    isRefetchError,
  } = useQuery({
    queryKey: ["recommendations", user?.email ?? "guest"],
    queryFn: () => getRecommendations(user?.email),
    select(data) {
      return {
      sections: data.sections.filter(section => section.products && section.products.length > 0),
      };
    },
    ...options,
  });

  return {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
    isRefetchError,
  };
};
