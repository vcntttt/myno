import { Product } from "@/types/products";

export function tagSimilarity(a: Product, b: Product): number {
  const setA = new Set(a.tags);
  const common = b.tags.filter((t) => setA.has(t)).length;
  return common / Math.max(a.tags.length, b.tags.length);
}
