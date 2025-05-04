import { useMemo } from "react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import type { Product } from "@/types/products";

export function useSearchFilters(products: Product[]) {
  const [viewMode, setViewMode] = useQueryState("viewMode", {
    defaultValue: "grid",
    clearOnDefault: false,
  });

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "relevance",
    clearOnDefault: false,
  });

  const [selectedCategories = [], setSelectedCategories] = useQueryState<
    string[]
  >("selectedCategories", parseAsArrayOf(parseAsString).withDefault([]));

  const [searchQuery = ""] = useQueryState("query", {
    defaultValue: "",
    clearOnDefault: false,
  });

  const clearFilters = () => setSelectedCategories([]);

  const totalItems = products.length;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.categoria.toLowerCase())
      )
        return false;
      if (searchQuery) {
        const term = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [products, selectedCategories, searchQuery]);

  const sorted = useMemo(() => {
    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [filtered, sortBy]);

  const resultsCount = sorted.length;

  return {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    selectedCategories,
    onToggleCategory: (id: string, checked: boolean) => {
      setSelectedCategories((prev) =>
        checked ? [...prev, id] : prev.filter((c) => c !== id)
      );
    },
    searchQuery,
    clearFilters,
    totalItems,
    resultsCount,
    sortedProducts: sorted,
  };
}
