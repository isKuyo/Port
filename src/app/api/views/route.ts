import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  const count = (await redis.get<number>("views")) ?? 0;
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await redis.incr("views");
  return NextResponse.json({ count });
}
