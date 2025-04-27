import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/price";
import defaultIMG from "@/assets/logo.png";
import { Product } from "@/types/products";
import Link from "next/link";

export const ProductCardList = ({
  name,
  price,
  image,
  categoria,
  description,
  slug,
}: Product) => {
  return (
    <Link
      href={`/products/${slug}`}
      className="block transition-opacity hover:opacity-80"
    >
      <Card>
        <div className="flex flex-col sm:flex-row">
          <Image
            src={image ?? defaultIMG}
            alt="Product Image"
            width={150}
            height={150}
            className="rounded-md md:mx-4 mx-auto"
          />
          <CardContent className="flex-1 p-4">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Categoría: {categoria}
                  </p>
                </div>
                <p className="font-medium">${formatPrice(price)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground mb-4 text-balance">
                  {description}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
