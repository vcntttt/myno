import { useMemo } from "react";
import { useCartStore } from "@/store/cart";
import allProducts from "@/lib/data/products.json";
import type { Product } from "@/types/products";
import { tagSimilarity } from "@/lib/utils/recommendations";

export function useCartRecommendations(limit: number = 4): Product[] {
  const cart = useCartStore((s) => s.cart);

  return useMemo(() => {
    const scores: Record<number, number> = {};

    cart.forEach((item) => {
      const base = allProducts.find((p) => p.id === item.id);
      if (!base) return;
      allProducts.forEach((p) => {
        if (p.id === base.id) return;
        const sim = tagSimilarity(base, p);
        scores[p.id] = (scores[p.id] ?? 0) + sim;
      });
    });

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([id]) => allProducts.find((p) => p.id === +id)!)
      .filter(Boolean)
      .slice(0, limit);
  }, [cart, limit]);
}
