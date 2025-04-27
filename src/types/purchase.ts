import { Product } from "./products"

export type PurchaseStatus = "Delivered" | "Processing" | "Cancelled"

export interface PurchaseItem extends Product {
  quantity: number
}

export interface Purchase {
  id: string
  date: string
  status: string
  items: PurchaseItem[]
  total: number
}
