import { NextResponse } from "next/server";
import products from "@/lib/data/products.json";
import { Redis } from "@upstash/redis";
import type { Product } from "@/types/products";
import type { Purchase } from "@/types/purchase";

const redis = Redis.fromEnv();

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tagSimilarity(a: Product, b: Product): number {
  const setA = new Set(a.tags);
  const common = b.tags.filter((t) => setA.has(t)).length;
  return common / Math.max(a.tags.length, b.tags.length);
}

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
  return NextResponse.json(products);
}

export async function POST(req: Request): Promise<NextResponse> {
  const { email } = (await req.json()) as { email?: string };
  const sections: { title: string; products: Product[] }[] = [];

  if (!email) {
    const topGlobal = await getGlobalTop(10);

    if (topGlobal.length === 0) {
      return NextResponse.json({
        sections: [
          {
            title: "Nuestro catálogo de productos",
            products: shuffle(products),
          },
        ],
      });
    }

    sections.push({ title: "Productos más vendidos", products: topGlobal });
    return NextResponse.json({ sections });
  }

  const history = (await redis.get<Purchase[]>(`history:${email}`)) ?? [];
  console.log("🚀 ~ POST ~ history:", history);
  if (history.length === 0) {
    return NextResponse.json({ sections });
  }

  const uniqueIds: number[] = Array.from(
    new Set(history.flatMap((h) => h.items).map((item) => Number(item.id)))
  );
  const recent: number[] = uniqueIds.slice(-2);

  for (const pid of recent) {
    const base = products.find((p) => p.id === pid);
    if (!base) continue;

    const scored = products
      .filter((p) => p.id !== pid)
      .map((p) => ({ p, score: tagSimilarity(base, p) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.p);

    sections.push({
      title: `Porque compraste ${base.name}`,
      products: scored,
    });
  }

  const coCounts: Record<number, number> = {};
  const keys: string[] = (await redis.keys("history:*")) ?? [];
  for (const key of keys) {
    if (key === `history:${email}`) continue;
    const other: Purchase[] = (await redis.get<Purchase[]>(key)) ?? [];
    for (const purchase of other) {
      for (const item of purchase.items) {
        const pid = Number(item.id);
        coCounts[pid] = (coCounts[pid] ?? 0) + 1;
      }
    }
  }

  const excluded = new Set<number>(recent);
  const alsoBoughtIds: number[] = Object.entries(coCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => Number(id))
    .filter((id) => !excluded.has(id))
    .slice(0, 10);

  const alsoBought: Product[] = alsoBoughtIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (alsoBought.length > 0) {
    sections.push({
      title: "Otros usuarios también compraron",
      products: alsoBought,
    });
  }

  return NextResponse.json({ sections });
}
