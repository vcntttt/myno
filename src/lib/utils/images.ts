import { StaticImageData } from "next/image";
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

export function getImage(image: string) {
  return imageMap[image];
}
