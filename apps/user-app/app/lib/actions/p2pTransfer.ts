"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

export async function p2pTransfer(reciever: string, amount: number) {
  const session = await getServerSession(authOptions);
  const sender = session?.user?.id;
  if (!sender) {
    return {
      message: "Error while sending",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: reciever,
    },
  });

  if (!toUser) {
    return {
      message: "Reciever is not Found",
    };
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;
    const senderBalance = await tx.balance.findUnique({
      where: {
        userId: Number(sender),
      },
    });
    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error("Insufficient Balance");
    }
    await tx.balance.update({
      where: {
        userId: Number(sender),
      },
      data: {
        amount: { decrement: amount },
      },
    });
    await tx.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: { increment: amount },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(sender),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
