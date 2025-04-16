import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
// import { Session, User } from "next-auth";
// import { JWT } from "next-auth/jwt";

interface CredentialsType {
  phone: string;
  name: string;
  email: string;
  password: string;
  demoPin: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "Enter your Number",
          required: true,
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter Your Name",
          required: true,
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter Your Email",
          required: true,
        },

        demoPin: {
          label: "Demo PIN (4-digit)",
          type: "number",
          placeholder: "Only for testing purpose",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          required: true,
        },
      },
      // TODO: User credentials type from next-auth
      async authorize(credentials: CredentialsType | undefined) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }
        // Do zod validation, OTP validation here
        const { phone, password, name, email, demoPin } = credentials;
        const existingUser = await db.user.findFirst({
          where: {
            number: phone,
          },
        });

        if (existingUser) {
          const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password
          );
          const isPinMatch = existingUser.lockerPin === Number(demoPin);
          if (isValidPassword && isPinMatch) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              lockerPin: existingUser.lockerPin,
            };
          } else {
            throw new Error("Invalid password or PIN");
          }
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);
          try {
            const user = await db.user.create({
              data: {
                number: phone,
                name: name,
                email: email,
                password: hashedPassword,
                lockerPin: Number(demoPin),
              },
            });

            return {
              id: user.id.toString(),
              name: user.name,
              email: user.number,
              lockerPin: user.lockerPin,
            };
          } catch (error) {
            console.error("Error in authorization:", error);
            throw new Error("Authorization failed");
          }
        }
      },
    }),
  ],
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
};
