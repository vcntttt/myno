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
    sections.push({ title: "Productos más vendidos", products: topGlobal });
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
    return NextResponse.json({ sections });
  }

  const history = (await redis.get<Purchase[]>(`history:${email}`)) ?? [];
  if (history.length === 0) {
    return NextResponse.json({ sections });
  }

  const allIds = Array.from(
    new Set(history.flatMap((h) => h.items.map((i) => Number(i.id))))
  );
  if (allIds.length < 2) {
    return NextResponse.json({ sections });
  }

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

  const used = new Set<number>(bestPair);
  for (const pid of bestPair) {
    const base = products.find((p) => p.id === pid);
    if (!base) continue;

    const candidates = products.filter((p) => p.id !== pid && !used.has(p.id));

    const scored = candidates
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
    sections.push({
      title: "Otros usuarios también compraron",
      products: alsoBought,
    });
  }

  return NextResponse.json({ sections });
}
