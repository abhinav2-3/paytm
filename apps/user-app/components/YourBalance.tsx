import React from "react";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { handleError } from "../app/lib/Exception";
import { formatPrice } from "../utils/FormatPrice";

async function getBalance() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    if (!balance) throw new handleError();
    return {
      amount: balance?.amount || 0,
    };
  } else {
    return {
      amount: 0,
    };
  }
}

const YourBalance = async () => {
  const balance = await getBalance();
  if (!balance) throw new handleError();

  return (
    <div className="w-full border-b border-slate-300 flex gap-3 px-16 py-3">
      <h1 className="font-bold">Your balance :</h1>
      <h1 className="font-medium">{formatPrice(balance?.amount / 100)}</h1>
    </div>
  );
};

export default YourBalance;
