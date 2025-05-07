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
