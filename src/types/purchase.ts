export type PurchaseStatus = "Delivered" | "Processing" | "Cancelled"

export interface PurchaseItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Purchase {
  id: string
  date: string
  total: number
  status: string
  items: PurchaseItem[]
}
