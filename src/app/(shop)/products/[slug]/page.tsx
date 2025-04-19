import { ProductDetail } from "@/components/products/product-details";
import { recommendations } from "@/data/products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return recommendations.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const product = recommendations.find((product) => product.slug === slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    images: [product.image.src],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image.src],
    },
    twitter: {
      title: product.name,
      description: product.description,
      images: [
        {
          alt: product.name,
          url: product.image.src,
        },
      ],
      card: "summary_large_image",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = recommendations.find((product) => product.slug === slug);
  if (!product) notFound();

  return <ProductDetail product={product} relatedProducts={recommendations} />;
}
