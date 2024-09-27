import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

const GOOGLE_CLIENT_ID = process.env["GOOGLE_CLIENT_ID"];
const GOOGLE_CLIENT_SECRET = process.env["GOOGLE_CLIENT_SECRET"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: {
        email: string;
        name: string;
      };
      account: {
        provider: "google" | "github";
      };
    }) {
      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
        update: {
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
