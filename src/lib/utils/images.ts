import { StaticImageData } from "next/image";
import defaultImg from "@/assets/placeholder.png";
import manzanas from "@/assets/manzanas.png";
import pepsi from "@/assets/pepsi.png";
import cocacola from "@/assets/cocacola.png";
import lechugas from "@/assets/lechugas.png";
import peras from "@/assets/peras.png";
import manzani from "@/assets/manzani.png";
import huevos from "@/assets/huevos.png";
import givenchyMen from "@/assets/givenchy-men.png";
import platanos from "@/assets/platanos.png";
import mangos from "@/assets/mangos.png";
import pepinos from "@/assets/pepinos.png";
import zanahorias from "@/assets/zanahorias.png";
import naranjas from "@/assets/naranjas.png";
import uvas from "@/assets/uvas.png";
import tomates from "@/assets/tomates.png";

const imageMap: Record<string, StaticImageData> = {
  manzanas,
  pepsi,
  cocacola,
  lechugas,
  peras,
  manzani,
  huevos,
  "givenchy-men": givenchyMen,
  platanos,
  mangos,
  pepinos,
  zanahorias,
  naranjas,
  uvas,
  tomates,
};

export function getImage(image: string) {
  return imageMap[image] ?? defaultImg;
}
