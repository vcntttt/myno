"use client";

import Image from "next/image";
import Link from "next/link";
import { Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/products";
import { ProductCard } from "@/components/products/product-card";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>/</span>
            <Link
              href={`/search?selectedCategories=${product.categoria.toLowerCase()}`}
              className="hover:text-foreground"
            >
              {product.categoria}
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center text-muted-foreground">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  "Imagen del producto"
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center justify-between mt-2 gap-2">
              <span className="text-muted-foreground">
                {formatPrice(product.price)}
              </span>
              <span className="text-muted-foreground">En stock</span>
            </div>
          </div>
          <Separator />
          <p className="text-muted-foreground">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1 active:opacity-80"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
