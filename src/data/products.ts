import manzanas from "@/assets/manzanas.png";
import cocacola from "@/assets/cocacola.png";
import pepsi from "@/assets/pepsi.png";
import lechugas from "@/assets/lechugas.png";
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
];