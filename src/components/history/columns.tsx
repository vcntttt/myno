"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Purchase } from "@/types/purchase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PurchaseDetails } from "@/components/history/purchase-details";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils/price";
import { getStatusLabel, getStatusVariant } from "@/lib/utils/purchase-status";

// Define columns for the data table
export const columns: ColumnDef<Purchase>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      return <div className="font-medium">#{id}</div>;
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
      // Convert string date to Date object
      const dateStr = row.getValue("date") as string;
      const date = new Date(dateStr);

      // Format date
      const formattedDate = format(date, "d MMM yyyy", { locale: es });

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{formattedDate}</div>
            </TooltipTrigger>
            <TooltipContent>
              {format(date, "PPpp", { locale: es })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
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
      const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

      return (
        <div>
          {totalItems} {totalItems === 1 ? "producto" : "productos"}
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

      // Format the amount as a currency
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
