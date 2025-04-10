import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) return NextResponse.json({ amount: 0, locked: 0 });

  const balance = await prisma.balance.findFirst({
    where: { userId },
  });

  return NextResponse.json({
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  });
}
