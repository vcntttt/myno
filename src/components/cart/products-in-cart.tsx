"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { QuantitySelector } from "./quantity-selector";
import { getImage } from "@/lib/utils/images";

export const ProductsInCart = () => {
  const {
    cart: cartItems,
    updateProductQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Productos ({cartItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-start sm:items-center gap-6 py-4"
              >
                <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={getImage(item.image)}
                    width={80}
                    height={80}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="hover:underline"
                  >
                    <h3 className="font-medium">{item.name}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm">
                    {item.categoria}
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 text-sm text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} / unidad
                      </p>
                    </div>
                  </div>
                  <QuantitySelector
                    quantity={item.quantity}
                    onDecrement={() =>
                      updateProductQuantity(item.id, item.quantity - 1)
                    }
                    onIncrement={() =>
                      updateProductQuantity(item.id, item.quantity + 1)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Seguir comprando</Link>
          </Button>
          <Button variant="ghost" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
