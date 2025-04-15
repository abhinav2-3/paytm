import express from "express";
import prisma from "@repo/db/client";
import cron from "node-cron";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: number;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await prisma.$transaction([
      prisma.balance.upsert({
        where: {
          userId: Number(paymentInformation.userId),
        },
        update: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
        create: {
          userId: Number(paymentInformation.userId),
          amount: paymentInformation.amount,
          locked: 0,
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    return res.status(411).json({
      success: false,
      message: "Error while processing webhook",
    });
  }
});

// Helper to calculate weekly interest
const calculateWeeklyInterest = (amount: number, rate: number) => {
  const yearlyInterest = (amount * rate) / 100;
  // const weeklyInterest = yearlyInterest / 52;
  return Math.floor(yearlyInterest); // optionally round down
};

async function updateWeeklyInterest() {
  const allLockers = await prisma.lockedBalance.findMany({
    where: {
      isLocked: true,
    },
  });
  const updatesByUser = new Map<number, number>(); // userId -> interestToAdd

  for (const locker of allLockers) {
    const interest = calculateWeeklyInterest(
      locker.amount / 100,
      locker.interestRate
    );

    // Update locker currentValue
    await prisma.lockedBalance.update({
      where: { id: locker.id },
      data: {
        currentValue: {
          increment: interest,
        },
      },
    });

    // Track how much interest needs to be added to user's Balance.locked
    updatesByUser.set(
      locker.userId,
      (updatesByUser.get(locker.userId) || 0) + interest
    );
  }

  // Batch update balances
  for (const [userId, interestSum] of updatesByUser.entries()) {
    await prisma.balance.update({
      where: { userId },
      data: {
        locked: {
          increment: interestSum,
        },
      },
    });
  }

  console.log("✅ Weekly interest updated for all lockers");
}

app.get("/", (req, res) => {
  res.send("Webhook is running...");
});

// Every Sunday at 2 AM  0 2 * * 0
const interestJob = cron.schedule("0 2 * * 0", async () => {
  console.log("🕒 Running scheduled weekly interest update...");
  await updateWeeklyInterest();
});

interestJob.start();

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Bank webhook is running on port no : ${PORT}`);
});
