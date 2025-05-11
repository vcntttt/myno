"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Purchase } from "@/types/purchase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PurchaseDetails } from "@/components/history/purchase-details";
import { formatPrice } from "@/lib/utils/price";
import { getStatusLabel, getStatusVariant } from "@/lib/utils/purchase-status";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Pedido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <div className="font-medium px-4">#{id}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateStr = row.getValue("date") as string;
      const date = new Date(dateStr);

      const formattedDate = format(date, "d MMM yyyy", { locale: es });

      return <p className="px-4">{formattedDate}</p>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId) as string).getTime();
      const dateB = new Date(rowB.getValue(columnId) as string).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "items",
    header: "Productos",
    cell: ({ row }) => {
      const items = row.getValue("items") as Purchase["items"];

      return (
        <div>
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 truncate">{item.name}</div>
              <div className="text-right">{item.quantity}</div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-end"
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"));

      const formatted = formatPrice(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "details",
    cell: ({ row }) => {
      const purchase = row.original;

      return <PurchaseDetails purchase={purchase} />;
    },
  },
];
