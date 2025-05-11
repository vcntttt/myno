import { Purchase } from "@/types/purchase";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    email: string;
  }>;
}

const redis = Redis.fromEnv();

export async function GET(_req: Request, { params }: Props) {
  const { email } = await params;

  if (!email) {
    return NextResponse.json({ error: "email necesario" }, { status: 400 });
  }

  const history = (await redis.get<Purchase[]>(`history:${email}`)) || [];
  return NextResponse.json(history);
}

export async function DELETE(req: Request, { params }: Props) {
  const { email } = await params;
  const { id } = (await req.json()) as { id?: string };

  if (!email || !id) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const key = `history:${email}`;
  const history = (await redis.get<Purchase[]>(key)) || [];
  const newHistory = history.filter((p) => p.id !== id);

  await redis.set(key, newHistory);
  return NextResponse.json({ ok: true });
}
