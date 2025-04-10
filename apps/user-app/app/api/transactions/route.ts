import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { TransactionsType } from "../../(dashboard)/transactions/page";
import { OnRampTransactionType } from "../../../components/OnRampTransaction";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) return NextResponse.json([]);

  const txns = await prisma.onRampTransaction.findMany({
    take: 6,
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });

  const transactions: TransactionsType[] = txns.map(
    (t: OnRampTransactionType) => ({
      time: t.startTime!.toDateString(),
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })
  );

  return NextResponse.json(transactions);
}
