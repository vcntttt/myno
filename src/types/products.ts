export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  categoria: string;
  tags: string[];
}

export interface CartProduct extends Product {
  quantity: number;
}
