import prisma from "@repo/db/client";
import React from "react";
import {
  OnRampTransactions,
  OnRampTransactionType,
} from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export interface TransactionsType {
  time: string;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  provider: string;
}
[];

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  await prisma.onRampTransaction.deleteMany({
    where: {
      status: "Processing",
    },
  });
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return txns.map((t: OnRampTransactionType) => ({
    time: t.startTime!.toDateString(),
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
