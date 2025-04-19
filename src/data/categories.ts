import { recommendations } from "./products";


interface Category {
  id: string
  name: string
  count: number
}

const categoryMap: Record<string, Category> = recommendations.reduce((acc, product) => {
  const cat = product.categoria;
  if (!acc[cat]) {
    acc[cat] = { 
      id: cat.toLowerCase().replace(/\s+/g, "-"),  // slug sencillo
      name: cat, 
      count: 0 
    };
  }
  acc[cat].count += 1;
  return acc;
}, {} as Record<string, Category>);

// 2) Extraemos los valores en un array
export const categories: Category[] = Object.values(categoryMap);