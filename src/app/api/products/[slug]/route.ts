import { NextResponse } from "next/server";
import type { Product } from "@/types/products";
import products from "@/lib/data/products.json";

interface Params {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: Params) {
  const product = (products as Product[]).find((p) => p.slug === params.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
