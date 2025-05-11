import { NextResponse } from "next/server";
import type { Product, ProductSlugResponse } from "@/types/products";
import products from "@/lib/data/products.json";
import { tagSimilarity } from "@/lib/utils/recommendations";

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

  const recommendations = (products as Product[])
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, score: tagSimilarity(product, p) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.p);

  const body: ProductSlugResponse = {
    product,
    recommendations,
  };

  console.log("🚀 ~ GET ~ body:", body);
  return NextResponse.json(body);
}
