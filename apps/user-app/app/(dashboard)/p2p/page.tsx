import React from "react";
import SendCard from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/P2PTransactions";

interface transactionsType {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
}

const getP2PTransaction = async () => {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
  });
  return txns.map((t: transactionsType) => ({
    time: t.timestamp,
    amount: t.amount,
    type: t.fromUserId === Number(session?.user?.id) ? "Sent" : "Received",
  }));
};

const page = async () => {
  const transactions = await getP2PTransaction();

  return (
    <div className="w-full flex">
      <div className="w-2/3">
        <SendCard />
      </div>
      <div className="1/3 grid place-items-center">
        <P2PTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default page;
