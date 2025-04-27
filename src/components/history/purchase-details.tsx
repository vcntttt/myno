"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Purchase } from "@/types/purchase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getStatusLabel, getStatusVariant } from "@/lib/utils/purchase-status";

interface PurchaseDetailsProps {
  purchase: Purchase;
}

export function PurchaseDetails({ purchase }: PurchaseDetailsProps) {
  const [open, setOpen] = useState(false);

  // Format date
  const formattedDate = format(new Date(purchase.date), "PPP", { locale: es });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
        <Eye className="h-4 w-4" />
        Ver detalles
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalles del pedido #{purchase.id}</DialogTitle>
          <DialogDescription>Realizado el {formattedDate}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Estado del pedido</h4>
            <Badge variant={getStatusVariant(purchase.status)}>
              {getStatusLabel(purchase.status)}
            </Badge>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Total</h4>
            <p className="text-lg font-bold">{formatPrice(purchase.total)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Productos</h4>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchase.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(purchase.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
