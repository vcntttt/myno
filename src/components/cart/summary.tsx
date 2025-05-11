"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAddPurchase } from "@/hooks/query/purchases";
import { formatPrice } from "@/lib/utils/price";
import { useCartStore } from "@/store/cart";
import { useUserStore } from "@/store/user";
import { Purchase } from "@/types/purchase";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const Summary = () => {
  const total = useCartStore((state) => state.getSummary().total);
  const subTotal = useCartStore((state) => state.getSummary().subTotal);
  const tax = useCartStore((state) => state.getSummary().tax);
  const user = useUserStore((state) => state.user);
  const cart = useCartStore((state) => state.cart);

  const addPurchase = useAddPurchase();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Por favor, inicia sesión para realizar el pago.");
      return;
    }

    const purchase: Purchase = {
      id: `${Math.random().toString(36).substring(2, 9)}`,
      date: new Date().toISOString(),
      items: cart,
      status: "Delivered",
      total,
      user: user.email,
    };

    addPurchase.mutateAsync({ email: user.email, purchase });

    redirect("/checkout");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA (19%)</span>
              <span>${formatPrice(tax)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
          </div>

          <div className="pt-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={addPurchase.isPending}
            >
              {addPurchase.isPending ? "Cargando..." : "Comprar"}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Al realizar tu compra, aceptas nuestros términos y condiciones y
              política de privacidad.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
