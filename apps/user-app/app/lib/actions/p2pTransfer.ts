"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";
import { amountSchema } from "../../../utils/zodSchema";

export async function p2pTransfer(reciever: string, amount: number) {
  const parsedData = amountSchema.safeParse(amount);

  if (!parsedData.success) {
    parsedData.error.errors.forEach((issue) => {
      throw new Error(issue.message);
    });
  }

  const session = await getServerSession(authOptions);
  const sender = session?.user?.id;
  if (!sender) {
    throw new Error("Error while sending");
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: reciever,
    },
  });

  if (!toUser) {
    throw new Error("Reciever is not Found");
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sender)} FOR UPDATE`;
    const senderBalance = await tx.balance.findUnique({
      where: {
        userId: Number(sender),
      },
    });

    const recieverBalance = await tx.balance.findUnique({
      where: { userId: toUser.id },
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

    if (recieverBalance) {
      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: { increment: amount },
        },
      });
    } else {
      await tx.balance.create({
        data: {
          userId: toUser.id,
          amount: amount,
          locked: 0,
        },
      });
    }

    await tx.p2PTransfer.create({
      data: {
        fromUserId: Number(sender),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
  return { success: true };
}
