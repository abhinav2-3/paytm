import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Your Name",
          required: true,
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "Your Email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        // Do zod validation, OTP validation here
        const { phone, password } = credentials;
        const existingUser = await db.user.findFirst({
          where: {
            number: phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
          const user = await db.user.create({
            data: {
              number: phone,
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
