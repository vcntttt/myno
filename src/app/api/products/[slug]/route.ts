import { NextResponse } from "next/server";
import type { Product } from "@/types/products";
import products from "@/lib/data/products.json";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_req: Request, { params }: Props) {
  const { slug } = await params;
  const product = (products as Product[]).find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
