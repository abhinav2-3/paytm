"use server";

import { getServerSession } from "next-auth";
import { amountSchema } from "../../../utils/zodSchema";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function withdrawCash(amount: number, number: number | null) {
  const parsedData = amountSchema.safeParse(amount);
  if (!parsedData.success) {
    parsedData.error.errors.forEach((issue) => {
      throw new Error(issue.message);
    });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      number: true,
    },
  });

  if (Number(user?.number) !== number) {
    throw new Error("Incorrect Number");
  }

  await prisma.balance.update({
    where: {
      userId: Number(userId),
    },
    data: {
      amount: {
        decrement: amount,
      },
    },
  });

  return { success: true };
}
