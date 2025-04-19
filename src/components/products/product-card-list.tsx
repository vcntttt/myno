import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import defaultIMG from "@/assets/logo.png";
import { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const ProductCardList = ({
  name,
  price,
  image,
  categoria,
  description,
}: Product) => {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row">
        <Image
          src={image ?? defaultIMG}
          alt="Product Image"
          width={150}
          height={150}
          className="rounded-md mx-4"
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
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Añadir al carrito
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
