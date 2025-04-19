"use client";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types/products";
import { Button } from "../ui/button";

interface Props {
  product: Product;
}

export const ProductDetails = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="space-y-4">
      <h2>
        Página de : <span className="underline">{product.name}</span>
      </h2>
      <Button onClick={() => addToCart({ ...product, quantity: 1 })}>
        Agregar
      </Button>
    </div>
  );
};
