"use client";

import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { useProducts } from "@/hooks/query/products";
import { useProductBySlug } from "@/hooks/query/product-by-slug";
import { notFound } from "next/navigation";
import { getImage } from "@/lib/utils/images";
import type { Product } from "@/types/products";
import { ProductGrid } from "./product-grid";

export function ProductDetail({ slug }: { slug: string }) {
  const { data: all } = useProducts();
  const { data: product } = useProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (all ?? []).filter((p: Product) => p.slug !== slug);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Producto agregado al carrito");
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
        {/* Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src={getImage(product.image)}
            alt={product.name}
            fill
            className="object-cover"
          />
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
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast(
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Enlace copiado al portapapeles
                  </div>
                );
              }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <ProductGrid />
        </div>
      )}
    </div>
  );
}
