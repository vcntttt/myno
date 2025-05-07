import { Purchase } from "@/types/purchase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getPurchases(email: string) {
  const res = await fetch(`/api/purchases/${email}`);
  const data = (await res.json()) as Purchase[];
  return data;
}

export const usePurchases = (email: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchases", email],
    queryFn: () => getPurchases(email),
    enabled: !!email,
  });

  return { data, isLoading, error };
};

interface AddPurchaseArgs {
  email: string;
  purchase: Purchase;
}

export function useAddPurchase() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AddPurchaseArgs>({
    mutationFn: async ({ email, purchase }) => {
      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purchase }),
      });
      if (!res.ok) {
        throw new Error("Error al guardar la compra");
      }
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["purchases", vars.email],
      });
    },
  });
}
