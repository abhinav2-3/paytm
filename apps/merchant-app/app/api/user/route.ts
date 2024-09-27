import { NextResponse } from "next/server";
import Prisma from "@repo/db/client";

export const GET = async () => {
  await Prisma.user.create({
    data: {
      email: "asd",
      name: "adsads",
      number: "598976531",
      password: "111",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
