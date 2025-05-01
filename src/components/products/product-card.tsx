"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { formatPrice } from "@/lib/utils/price";
import defaultIMG from "@/assets/logo.png";
import { Product } from "@/types/products";
import Link from "next/link";
import manzanas from "@/assets/manzanas.png";
import pepsi from "@/assets/pepsi.png";
import cocacola from "@/assets/cocacola.png";
import lechugas from "@/assets/lechugas.png";
import peras from "@/assets/peras.png";
import manzani from "@/assets/manzani.png";
import huevos from "@/assets/huevos.png";
import givenchyMen from "@/assets/givenchy-men.png";

const imageMap: Record<string, StaticImageData> = {
  manzanas,
  pepsi,
  cocacola,
  lechugas,
  peras,
  manzani,
  huevos,
  "givenchy-men": givenchyMen,
};

export function ProductCard({ name, price, image, slug }: Product) {
  const src = imageMap[image];
  return (
    <Link
      href={`/products/${slug}`}
      className="block transition-opacity hover:opacity-80"
    >
      <Card className="overflow-hidden rounded-t-md pt-0">
        <CardHeader className="px-0 md:px-0">
          <Image
            src={src ?? defaultIMG}
            placeholder="blur"
            alt="Product Image"
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
        </CardHeader>
        <CardContent className="flex-col md:flex md:flex-row items-center md:justify-between">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-sm font-medium">${formatPrice(price)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
