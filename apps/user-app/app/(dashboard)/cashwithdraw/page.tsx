import React from "react";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { handleError } from "../../lib/Exception";
import WithdrawCash from "../../../components/WithdrawCash";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

const page = async () => {
  const balance = await getBalance();

  if (!balance) throw new handleError();
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Withdraw your cash
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div>
          <WithdrawCash />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
      </section>
    </div>
  );
};

export default page;
