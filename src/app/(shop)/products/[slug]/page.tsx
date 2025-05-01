import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-details";
import products from "@/lib/data/products.json";
import { Suspense } from "react";
import { SkeletonProductDetail } from "@/components/products/product-details-skeleton";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  if (!products.some((p) => p.slug === slug)) {
    notFound();
  }

  return (
    <Suspense fallback={<SkeletonProductDetail />}>
      <ProductDetail slug={slug} />
    </Suspense>
  );
}
