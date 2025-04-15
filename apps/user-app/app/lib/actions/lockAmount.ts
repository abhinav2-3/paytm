"use server";

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { Prisma } from "@prisma/client";

interface LockerData {
  amount: number;
  maturityDate: Date;
  pin: number;
  name: string;
  interestRate: number;
}

const PENALITY = 2;

export async function createLockedAmount({
  amount,
  maturityDate,
  pin,
  name,
  interestRate,
}: LockerData) {
  console.log(maturityDate, "maturirty date");
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

export async function breakeLocker(id: number, pin: number, penality: boolean) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  if (!userId) {
    return {
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  if (user.lockerPin !== pin) {
    return {
      statusCode: 401,
      message: "Invalid PIN",
    };
  }

  // 🔒 All changes in a transaction
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const locker = await tx.lockedBalance.findFirst({
      where: { id },
    });

    if (!locker) {
      return {
        statusCode: 404,
        message: "Locker is no longer Exist",
      };
    }

    // ⚠️ Apply 1% penalty if early withdrawal
    const deduction = penality ? Math.floor(locker.currentValue * 0.02) : 0;
    const finalValue = locker.currentValue - deduction;
    // 💰 Update balance
    await tx.balance.update({
      where: { userId },
      data: {
        amount: {
          increment: finalValue,
        },
        locked: {
          decrement: locker.currentValue,
        },
      },
    });

    await tx.balance.update({
      where: { id: 2 },
      data: {
        amount: {
          increment: deduction,
        },
      },
    });

    // ❌ Delete the locker
    await tx.lockedBalance.delete({
      where: { id },
    });
  });

  return {
    statusCode: 200,
    message: penality
      ? "FD unlocked early. 1% penalty applied."
      : "FD unlocked successfully.",
  };
}
