import prisma from "@repo/db/client";
import React from "react";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export interface TransactionsType {
  startTime: Date;
  amount: number;
  status: string;
  provider: string;
}
[];

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t: TransactionsType) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

const Transactions = async () => {
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="w-full">
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;
