"use client";

import { AddMoney } from "../../../components/AddMoney";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { TransactionsType } from "../transactions/page";
import { BalanceCardWrapper } from "../../../components/BalanceCardWrapper";
import { useEffect, useState } from "react";

// async function getBalance() {
//   const session = await getServerSession(authOptions);
//   const balance = await prisma.balance.findFirst({
//     where: {
//       userId: Number(session?.user?.id),
//     },
//   });
//   return {
//     amount: balance?.amount || 0,
//     locked: balance?.locked || 0,
//   };
// }

// async function getOnRampTransactions() {
//   const session = await getServerSession(authOptions);
//   const txns = await prisma.onRampTransaction.findMany({
//     take: 6,
//     where: {
//       userId: Number(session?.user?.id),
//     },
//     orderBy: {
//       startTime: "desc",
//     },
//   });

//   return txns.map((t: TransactionsType) => ({
//     time: t.startTime,
//     amount: t.amount,
//     status: t.status,
//     provider: t.provider,
//   }));
// }

export default function () {
  const [refreshKey, setRefreshKey] = useState(0);
  const [transactions, setTransactions] = useState<TransactionsType[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    console.log(data);
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshKey]);

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney onSuccess={() => setRefreshKey((prev) => prev + 1)} />
        </div>
        <div>
          {/* <BalanceCard amount={balance.amount} locked={balance.locked} /> */}
          <BalanceCardWrapper refreshTrigger={refreshKey} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
