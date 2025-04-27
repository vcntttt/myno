import manzanas from "@/assets/manzanas.png";
import cocacola from "@/assets/cocacola.png";
import pepsi from "@/assets/pepsi.png";
import lechugas from "@/assets/lechugas.png";
import peras from "@/assets/peras.png";
import manzani from "@/assets/manzani.png";
import huevos from "@/assets/huevos.png";
import givenchyMen from "@/assets/givenchy-men.png";
import { Product } from "@/types/products";

export const recommendations: Product[] = [
  {
    id: 1,
    name: "50x Manzanas",
    price: 40,
    image: manzanas,
    slug: "50x-manzanas",
    categoria: "Frutas",
    description: "Caja de 50 manzanas frescas de calidad premium, ideal para minimarkets, fruterías y venta a granel."
  },
  {
    id: 2,
    name: "50x Pepsi",
    price: 50,
    image: pepsi,
    slug: "50x-pepsi",
    categoria: "Bebidas",
    description: "Pack mayorista de 50 latas de Pepsi (350 ml c/u). Perfecto para tiendas, almacenes y eventos."
  },
  {
    id: 3,
    name: "50x Coca Cola",
    price: 60,
    image: cocacola,
    slug: "50x-coca-cola",
    categoria: "Bebidas",
    description: "Caja de 50 latas de Coca Cola (350 ml c/u). Presentación ideal para venta en tiendas y consumo masivo."
  },
  {
    id: 4,
    name: "50x Lechugas",
    price: 30,
    image: lechugas,
    slug: "50x-lechugas",
    categoria: "Verduras",
    description: "Pack de 50 lechugas frescas, listas para la venta directa en ferias, verdulerías o restaurantes."
  },
  {
    id: 5,
    name: "50x Peras",
    price: 45,
    image: peras,
    slug: "50x-peras",
    categoria: "Frutas",
    description:
      "Caja de 50 peras frescas de calidad premium, ideal para minimarkets, fruterías y venta a granel.",
  },
  {
    id: 6,
    name: "12x Mistral de Manzana",
    price: 70,
    image: manzani,
    slug: "mistral-de-manzana",
    categoria: "Bebidas",
    description:
      "Pack de 12 botellas de Mistral de Manzana, perfecto para tiendas especializadas y eventos.",
  },
  {
    id: 7,
    name: "Pack de Huevos",
    price: 25,
    image: huevos,
    slug: "pack-huevos",
    categoria: "Alimentos",
    description:
      "Caja de 30 docenas de huevos frescos calibre XL, lista para la venta al por mayor.",
  },
  {
    id: 8,
    name: "Givenchy Men",
    price: 120,
    image: givenchyMen,
    slug: "givenchy-men",
    categoria: "Perfumes",
    description:
      "Pack de 12 unidades de perfume Givenchy Men, fragancia premium para tiendas especializadas.",
  },
];