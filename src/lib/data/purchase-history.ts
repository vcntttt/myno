import { recommendations } from "@/lib/data/products";
import { Product } from "@/types/products";
import type { Purchase, PurchaseItem } from "@/types/purchase";

const mkItem = (productSlug: string, quantity: number): PurchaseItem => {
  const p = recommendations.find((r : Product) => r.slug === productSlug)!;
  return { ...p, quantity };
};

function calculateTotal(items: PurchaseItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const purchaseData: Purchase[] = [
  {
    id: "ORD-001",
    date: "2025-03-15T14:30:00Z",
    status: "Delivered",
    items: [mkItem("50x-manzanas", 2), mkItem("50x-pepsi", 1)],
    total: calculateTotal([mkItem("50x-manzanas", 2), mkItem("50x-pepsi", 1)]),
  },
  {
    id: "ORD-002",
    date: "2025-02-28T10:15:00Z",
    status: "Delivered",
    items: [mkItem("50x-coca-cola", 1)],
    total: calculateTotal([mkItem("50x-coca-cola", 1)]),
  },
  {
    id: "ORD-003",
    date: "2025-02-15T16:45:00Z",
    status: "Delivered",
    items: [mkItem("50x-lechugas", 3)],
    total: calculateTotal([mkItem("50x-lechugas", 3)]),
  },
  {
    id: "ORD-004",
    date: "2025-01-03T09:20:00Z",
    status: "Delivered",
    items: [mkItem("50x-peras", 1)],
    total: calculateTotal([mkItem("50x-peras", 1)]),
  },
  {
    id: "ORD-005",
    date: "2025-04-05T11:30:00Z",
    status: "Processing",
    items: [mkItem("mistral-de-manzana", 2)],
    total: calculateTotal([mkItem("mistral-de-manzana", 2)]),
  },
  {
    id: "ORD-006",
    date: "2025-03-22T15:10:00Z",
    status: "Cancelled",
    items: [mkItem("pack-huevos", 1)],
    total: calculateTotal([mkItem("pack-huevos", 1)]),
  },
  {
    id: "ORD-007",
    date: "2025-05-10T13:45:00Z",
    status: "Processing",
    items: [mkItem("givenchy-men", 1)],
    total: calculateTotal([mkItem("givenchy-men", 1)]),
  },
  {
    id: "ORD-008",
    date: "2025-04-18T17:20:00Z",
    status: "Delivered",
    items: [mkItem("50x-pepsi", 4)],
    total: calculateTotal([mkItem("50x-pepsi", 4)]),
  },
];
