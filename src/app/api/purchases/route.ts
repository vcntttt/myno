import { Purchase } from "@/types/purchase";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

interface Body {
  email: string;
  purchase: Purchase;
}

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const { email, purchase } = (await req.json()) as Body;

  if (!email || !purchase) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const key = `history:${email}`;
  const existing: Purchase[] = (await redis.get(key)) || [];
  await redis.set(key, [...existing, purchase]);

  for (const item of purchase.items) {
    await redis.hincrby("sales_count", item.id.toString(), item.quantity);
  }

  return NextResponse.json({ ok: true });
}
