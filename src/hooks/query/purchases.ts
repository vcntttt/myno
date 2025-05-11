import { Purchase } from "@/types/purchase";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

async function getPurchases(email: string) {
  const res = await fetch(`/api/purchases/${email}`);
  const data = (await res.json()) as Purchase[];
  return data;
}

type UsePurchasesOptions = Omit<
  UseQueryOptions<Purchase[], Error>,
  "queryKey" | "queryFn"
>;

export function usePurchases(email: string, options?: UsePurchasesOptions) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["purchases", email],
    queryFn: () => getPurchases(email),
    ...options,
  });

  return { data, isLoading, error };
}

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

interface DeletePurchaseArgs {
  email: string;
  id: string;
}

export function useDeletePurchase() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeletePurchaseArgs>({
    mutationFn: async ({ email, id }) => {
      const res = await fetch(`/api/purchases/${email}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar la compra");
    },
    onSuccess: (_data, { email }) => {
      queryClient.invalidateQueries({ queryKey: ["purchases", email] });
    },
  });
}
