"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, HistoryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type for order details
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  orderId: string;
  date: string;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}
export default function PurchaseConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you might fetch order details from an API
    // using the order ID from the URL params
    const orderId = searchParams.get("orderId");

    // For demo purposes, we'll simulate loading order details
    const loadOrderDetails = () => {
      // Simulate API call delay
      setTimeout(() => {
        // Create sample order details (in a real app, this would come from the backend)
        const orderData: OrderDetails = {
          orderId: orderId || `ORD-${Math.floor(Math.random() * 10000)}`,
          date: new Date().toISOString(),
          total: Number.parseFloat(searchParams.get("total") || "0"),
          subtotal: Number.parseFloat(searchParams.get("subtotal") || "0"),
          tax: Number.parseFloat(searchParams.get("tax") || "0"),
          discount: Number.parseFloat(searchParams.get("discount") || "0"),
          items: JSON.parse(
            decodeURIComponent(searchParams.get("items") || "[]")
          ),
          shippingAddress: "Calle Ejemplo, 123, 28001 Madrid, España",
          paymentMethod: "Tarjeta terminada en 4242",
        };

        setOrderDetails(orderData);
        setIsLoading(false);
      }, 500);
    };

    loadOrderDetails();
  }, [searchParams]);

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
          <Link href="/">
            <HistoryIcon className="mr-2 h-4 w-4" />
            Ver Historial
          </Link>
        </Button>
      </div>
    </>
  );
}
