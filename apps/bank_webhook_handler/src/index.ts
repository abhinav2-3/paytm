import express from "express";
import prisma from "@repo/db/client";
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

app.get("/", (req, res) => {
  res.send("Webhook is running...");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Bank webhook is running on port no : ${PORT}`);
});
