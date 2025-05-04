"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/query/categories";
import { useProducts } from "@/hooks/query/products";
import { useSearchFilters } from "@/hooks/use-search";
import { FilterSidebar } from "@/components/search/filters";
import { SearchFiltersSkeleton } from "@/components/search/filters-skeleton";
import { SearchPageSkeleton } from "@/components/search/search-page-skeleton";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardList } from "@/components/products/product-card-list";
import { SkeletonProductGrid } from "@/components/products/product-grid-skeleton";

export function ClientSearchPage() {
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const { data: products = [], isLoading: prodLoading } = useProducts();

  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    selectedCategories,
    onToggleCategory,
    clearFilters,
    totalItems,
    resultsCount,
    sortedProducts,
  } = useSearchFilters(products);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Render completo skeleton si ambos cargan
  if (catLoading && prodLoading) {
    return <SearchPageSkeleton />;
  }

  // Sidebar diferido
  const sidebar = catLoading ? (
    <SearchFiltersSkeleton />
  ) : (
    <FilterSidebar
      categories={categories}
      selectedCategories={selectedCategories}
      onToggleCategory={onToggleCategory}
    />
  );

  // Área de resultados diferida
  const resultsArea = prodLoading ? (
    <SkeletonProductGrid />
  ) : sortedProducts.length === 0 ? (
    <div className="flex flex-col items-center py-16 text-center">
      <Search className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        No se encontraron resultados
      </h2>
      <Button variant="outline" onClick={clearFilters}>
        Limpiar filtros
      </Button>
    </div>
  ) : viewMode === "grid" ? (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {sortedProducts.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  ) : (
    <div className="space-y-4">
      {sortedProducts.map((p) => (
        <ProductCardList key={p.id} {...p} />
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Filters */}
      <div className="mb-8 flex gap-2 md:hidden">
        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" aria-label="Filtros" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="flex items-center justify-between mb-4">
              <SheetTitle>Filtros</SheetTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar
              </Button>
            </div>
            {sidebar}
            <div className="mt-4">
              <SheetClose asChild>
                <Button className="w-full">
                  Ver {resultsCount} resultados
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop layout */}
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-64 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpiar
            </Button>
          </div>
          {sidebar}
        </aside>

        <main className="flex-1 space-y-6">
          {/* Header controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Mostrando {resultsCount} de {totalItems} resultados
            </p>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevancia</SelectItem>
                  <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
                  <SelectItem value="price-desc">
                    Precio: Alto a Bajo
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {resultsArea}
        </main>
      </div>
    </>
  );
}
