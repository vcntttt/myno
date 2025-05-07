import { Product } from "./products";

export type PurchaseStatus = "Delivered" | "Processing" | "Cancelled";

export interface PurchaseItem extends Product {
  quantity: number;
}

export interface Purchase {
  id: string;
  user: string; // email
  date: string;
  status: PurchaseStatus;
  items: PurchaseItem[];
  total: number;
}
