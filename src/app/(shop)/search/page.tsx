"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { categories } from "@/data/categories";
import { recommendations as products } from "@/data/products";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ProductCard } from "@/components/products/product-card";
import { ProductCardList } from "@/components/products/product-card-list";

export default function SearchPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
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

  const totalItems = products.length;
  const filteredProducts = products.filter((product) => {
    if (
      selectedCategories?.length > 0 &&
      !selectedCategories.includes(
        product.categoria.toLowerCase().replace(/\s+/g, "-")
      )
    ) {
      return false;
    }

    // filtro por texto en nombre o descripción
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      const hayEnNombre = product.name.toLowerCase().includes(term);
      const hayEnDesc = product.description?.toLowerCase().includes(term);
      if (!hayEnNombre && !hayEnDesc) {
        return false;
      }
    }

    return true;
  });
  const resultsCount = filteredProducts.length;

  const FiltersComponent = () => (
    <div className="space-y-6">
      {/* Categorías */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">
            Categorías
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories?.includes(category.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category.id,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category.id)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    {category.name}{" "}
                    <span className="text-muted-foreground">
                      ({category.count})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Barra de búsqueda principal */}
      <div className="mb-8">
        <div className="flex gap-2">
          <Sheet
            open={isMobileFiltersOpen}
            onOpenChange={setIsMobileFiltersOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 md:hidden"
                aria-label="Filtros"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-4">
              <div className="py-4">
                <div className="flex items-center justify-between mb-6">
                  <SheetTitle>Filtros</SheetTitle>
                  <Button variant="ghost" size="sm" onClick={() => {}}>
                    Limpiar todo
                  </Button>
                </div>
                <FiltersComponent />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                <SheetClose asChild>
                  <Button className="w-full">
                    Ver {resultsCount} resultados
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros laterales (desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="h-8 text-sm"
              >
                Limpiar
              </Button>
            </div>
            <FiltersComponent />
          </div>
        </div>

        {/* Resultados */}
        <div className="flex-1">
          {/* Barra de herramientas */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Mostrando {resultsCount} de {totalItems} resultados
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevancia</SelectItem>
                  <SelectItem value="price-asc">
                    Precio: menor a mayor
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Precio: mayor a menor
                  </SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none rounded-l-md"
                  onClick={() => setViewMode("grid")}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-none rounded-r-md"
                  onClick={() => setViewMode("list")}
                  aria-label="Vista de lista"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No se encontraron resultados
              </h2>
              <p className="text-muted-foreground mb-6">
                Intenta con otros términos de búsqueda o ajusta los filtros
              </p>
              <Button variant="outline" onClick={() => {}}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <ProductCardList key={product.id} {...product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
