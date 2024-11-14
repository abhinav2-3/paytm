import z from "zod";

export const SignupSchema = z.object({
  phone: z.string(),
  password: z
    .string()
    .min(8, { message: "Password Must be 8 or more characters long" }),
  email: z.string(),
  name: z.string(),
});

export const amountSchema = z
  .number()
  .positive("Amount should be a positive number")
  .max(5000000, "Amount should be less than 50 lakhs");
