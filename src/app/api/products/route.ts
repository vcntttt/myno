// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import products from "@/lib/data/products.json";
import { Redis } from "@upstash/redis";
import type { Product } from "@/types/products";
import type { Purchase } from "@/types/purchase";
import { tagSimilarity } from "@/lib/utils/recommendations";

const redis = Redis.fromEnv();

async function getGlobalTop(n: number): Promise<Product[]> {
  const raw = await redis.hgetall<Record<string, number>>("sales_count");
  const counts: Record<string, number> = raw ?? {};
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => Number(id))
    .map((pid) => products.find((p) => p.id === pid))
    .filter((p): p is Product => Boolean(p))
    .slice(0, n);
}

export async function GET(): Promise<NextResponse> {
  // GET original: devuelve todo el catálogo
  return NextResponse.json(products);
}

export async function POST(req: Request): Promise<NextResponse> {
  const { email } = (await req.json()) as { email?: string };
  const sections: { title: string; products: Product[] }[] = [];

  let history: Purchase[] = [];
  if (email) {
    history = (await redis.get<Purchase[]>(`history:${email}`)) ?? [];
  }

  if (!email || history.length === 0) {
    const top8 = await getGlobalTop(8);
    sections.push({ title: "Productos más vendidos", products: top8 });

    const usedIds = new Set(top8.map((p) => p.id));
    const remaining = products.filter((p) => !usedIds.has(p.id));
    sections.push({ title: "El resto del catálogo", products: remaining });

    return NextResponse.json({ sections });
  }

  const allIds = Array.from(
    new Set(history.flatMap((h) => h.items.map((i) => Number(i.id))))
  );

  const used = new Set<number>();
  if (allIds.length === 1) {
    const pid = allIds[0];
    const base = products.find((p) => p.id === pid);
    if (base) {
      const scored = products
        .filter((p) => p.id !== pid)
        .map((p) => ({ p, score: tagSimilarity(base, p) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((x) => x.p);

      used.add(pid);
      scored.forEach((p) => used.add(p.id));

      sections.push({
        title: `Porque compraste ${base.name}`,
        products: scored,
      });
    }
  } else {
    let bestPair: [number, number] = [allIds[0], allIds[1]];
    let minSim = Infinity;
    for (let i = 0; i < allIds.length; i++) {
      for (let j = i + 1; j < allIds.length; j++) {
        const a = products.find((p) => p.id === allIds[i])!;
        const b = products.find((p) => p.id === allIds[j])!;
        const sim = tagSimilarity(a, b);
        if (sim < minSim) {
          minSim = sim;
          bestPair = [allIds[i], allIds[j]];
        }
      }
    }

    used.add(bestPair[0]);
    used.add(bestPair[1]);
    for (const pid of bestPair) {
      const base = products.find((p) => p.id === pid);
      if (!base) continue;

      const scored = products
        .filter((p) => p.id !== pid && !used.has(p.id))
        .map((p) => ({ p, score: tagSimilarity(base, p) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((x) => x.p);

      scored.forEach((p) => used.add(p.id));

      sections.push({
        title: `Porque compraste ${base.name}`,
        products: scored,
      });
    }
  }

  const coCounts: Record<number, number> = {};
  const keys = (await redis.keys("history:*")) ?? [];

  for (const key of keys) {
    if (key === `history:${email}`) continue;
    const other = (await redis.get<Purchase[]>(key)) ?? [];
    other.forEach((h) =>
      h.items.forEach((i) => {
        const idNum = Number(i.id);
        coCounts[idNum] = (coCounts[idNum] ?? 0) + 1;
      })
    );
  }

  const alsoBoughtIds = Object.entries(coCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => Number(id))
    .filter((id) => !used.has(id))
    .slice(0, 10);

  const alsoBought = alsoBoughtIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (alsoBought.length > 0) {
    alsoBought.forEach((p) => used.add(p.id));
    sections.push({
      title: "Otros usuarios también compraron",
      products: alsoBought,
    });
  }

  const remaining = products.filter((p) => !used.has(p.id));
  if (remaining.length > 0) {
    sections.push({
      title: "El resto del catálogo",
      products: remaining,
    });
  }

  return NextResponse.json({ sections });
}
