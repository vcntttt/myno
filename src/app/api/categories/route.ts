import { NextResponse } from "next/server";
import products from "@/lib/data/products.json";
import { Category } from "@/types/categories";

export async function GET() {
  const categoryMap = (products as Array<{ categoria: string }>).reduce<
    Record<string, Category>
  >((acc, product) => {
    const cat = product.categoria;
    if (!acc[cat]) {
      acc[cat] = {
        id: cat.toLowerCase().replace(/\s+/g, "-"),
        name: cat,
        count: 0,
      };
    }
    acc[cat].count += 1;
    return acc;
  }, {});

  const categories = Object.values(categoryMap);
  return NextResponse.json(categories);
}
