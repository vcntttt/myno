import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import products from "@/lib/data/products.json";
import type { Purchase, PurchaseItem } from "@/types/purchase";

const redis = Redis.fromEnv();

function buildPurchase(prodId: number, user: string): Purchase {
  const prod = products.find((p) => p.id === prodId);
  if (!prod) throw new Error(`Producto con id ${prodId} no encontrado`);

  const item: PurchaseItem = {
    id: prod.id,
    name: prod.name,
    price: prod.price,
    slug: prod.slug,
    categoria: prod.categoria,
    description: prod.description,
    image: prod.image,
    tags: prod.tags,
    quantity: 1,
  };

  return {
    id: `${Math.random().toString(36).substring(2, 9)}`,
    user,
    date: new Date().toISOString(),
    status: "Delivered",
    items: [item],
    total: item.price,
  };
}

export async function GET(): Promise<NextResponse> {
  const user1 = "vrivera.dev@gmail.com";
  const user2 = "vrivera2023@alu.uct.cl";

  const user1ProdIds = [8, 31, 32, 33, 34, 35, 21, 22];
  const user2ProdIds = [1, 5, 9, 10, 11, 12, 4, 14, 15, 16];

  await Promise.all([
    redis.del(`history:${user1}`),
    redis.del(`history:${user2}`),
    redis.del("sales_count"),
  ]);

  const user1Purchases = user1ProdIds.map((id) => buildPurchase(id, user1));
  const user2Purchases = user2ProdIds.map((id) => buildPurchase(id, user2));

  await Promise.all([
    redis.set(`history:${user1}`, user1Purchases),
    redis.set(`history:${user2}`, user2Purchases),
  ]);

  for (const purchase of [...user1Purchases, ...user2Purchases]) {
    for (const item of purchase.items) {
      await redis.hincrby("sales_count", item.id.toString(), item.quantity);
    }
  }

  return NextResponse.json({
    ok: true,
    seeded: {
      [user1]: user1Purchases.length,
      [user2]: user2Purchases.length,
    },
  });
}
