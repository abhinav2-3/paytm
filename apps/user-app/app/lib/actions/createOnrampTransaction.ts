"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const webhook = async (token: string, userId: string, amount: number) => {
  try {
    const response = await fetch("http://localhost:3003/hdfcWebhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        user_identifier: userId,
        amount: amount,
      }),
    });

    await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return { message: "Unaunthenticated Request" };
  }

  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  await webhook(token, session.user?.id, amount * 100);

  return { message: "Done" };
}
