"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { amountSchema } from "../../../utils/zodSchema";

const WEBHOOK_API: string = process.env.WEBHOOK_URL || "";
// const WEBHOOK_API: string = "https://paytm-webhook.onrender.com/hdfcWebhook";

const webhook = async (token: string, userId: string, amount: number) => {
  try {
    const response = await fetch(WEBHOOK_API, {
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

    const data = await response.json();
    return data;
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
    throw new Error("Login please");
  }

  const parsedData = amountSchema.safeParse(amount);

  if (!parsedData.success) {
    parsedData.error.errors.forEach((issue) => {
      throw new Error(issue.message);
    });
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

  const response = await webhook(token, session.user?.id, amount * 100);
  return response;
}
