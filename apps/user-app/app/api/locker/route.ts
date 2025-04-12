import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { FDItem } from "../../../types/types";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);
  if (!userId)
    return NextResponse.json({
      statusCode: 401,
      message: "Unauthorized",
    });

  const lockerMoney = await prisma.lockedBalance.findMany({
    where: {
      userId: userId,
    },
  });
  if (!lockerMoney)
    return NextResponse.json({
      statusCode: 404,
      message: "You haven't Locked you Money!",
    });
  const lockerList: FDItem[] = lockerMoney.map((fd) => {
    return {
      id: fd.id,
      name: fd.name,
      startDate: fd.startDate.toLocaleDateString(),
      maturityDate: fd.maturityDate.toLocaleDateString(),
      amount: fd.amount,
      currentValue: fd.currentValue,
      interestRate: fd.interestRate,
    };
  });
  return NextResponse.json({
    statusCode: 200,
    message: "Here is you locked money",
    data: lockerList,
  });
}
