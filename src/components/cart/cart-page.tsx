"use client";

import { Summary } from "@/components/cart/summary";
import { ProductsInCart } from "@/components/cart/products-in-cart";
import { useCartStore } from "@/store/cart";
import { EmptyCart } from "@/components/cart/empty-cart";
import { ProductGrid } from "@/components/products/product-grid";

export function ClientCartPage() {
  const totalItems = useCartStore((state) => state.getSummary().totalItems);
  const isEmpty = totalItems === 0;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Carrito de Compra</h1>

      {!isEmpty ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProductsInCart />
          <Summary />
        </div>
      ) : (
        <EmptyCart />
      )}

      <h2 className="text-xl font-semibold mb-6">También te puede interesar</h2>
      <ProductGrid />
    </>
  );
}
