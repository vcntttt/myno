"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/price";
import defaultIMG from "@/assets/logo.png";
import { Product } from "@/types/products";
import Link from "next/link";
import { getImage } from "@/lib/utils/images";

export function ProductCard({ name, price, image, slug }: Product) {
  const src = getImage(image);
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
