"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";

export default function PurchaseConfirmationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
    const loadOrderDetails = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    loadOrderDetails();
  }, [clearCart]);

  if (isLoading) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Procesando tu pedido...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-muted-foreground">
          Tu pedido ha sido confirmado y está siendo procesado.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button variant="outline" asChild className="flex-1">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir comprando
          </Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/profile/history">
            <HistoryIcon className="mr-2 h-4 w-4" />
            Ver Historial
          </Link>
        </Button>
      </div>
    </>
  );
}
