"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

export async function createLockedAmount(
  amount: number,
  maturityDate: Date,
  pin: number
) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId) throw new Error("User not found");

  let balance = await prisma.balance.findFirst({
    where: {
      userId,
    },
  });

  if (balance?.lockedPin !== pin) {
    return {
      statusCode: 400,
      message: "Invalid PIN",
    };
  }

  if (balance?.amount && balance?.amount < amount * 100) {
    return {
      statusCode: 400,
      message: "Insufficient balance",
    };
  }
  let lockedAmount;
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    balance = await tx.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        amount: {
          decrement: amount * 100,
        },
        locked: {
          increment: amount * 100,
        },
        lockedPin: pin,
      },
    });

    lockedAmount = await prisma.lockedBalance.upsert({
      where: {
        userId: Number(userId),
      },
      update: {
        amount: {
          increment: amount * 100,
        },
      },
      create: {
        amount: amount,
        userId: Number(userId),
        isLocked: true,
        startDate: new Date(),
        maturityDate: maturityDate,
      },
    });
  });

  return {
    statusCode: 201,
    message: "Amount locked successfully",
    data: {
      balance,
      lockedAmount,
    },
  };
}
