"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

export async function createLockedAmount(
  amount: number,
  maturityDate: Date,
  pin: number,
  name: string,
  interestRate: number
) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId)
    return {
      statusCode: 401,
      message: "Unauthorized",
    };

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user)
    return {
      statusCode: 401,
      message: "Unauthorized",
    };

  if (user.lockerPin !== pin)
    return {
      statusCode: 401,
      message: "Invalid PIN",
    };

  let balance = await prisma.balance.findFirst({
    where: {
      userId,
    },
  });

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
      },
    });

    lockedAmount = await prisma.lockedBalance.create({
      data: {
        userId: Number(userId),
        name: name,
        amount: amount * 100,
        currentValue: amount * 100,
        isLocked: true,
        startDate: new Date(),
        maturityDate: maturityDate,
        interestRate: interestRate,
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
