import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email().min(1, { message: "Email is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    repeatPassword: z
      .string()
      .min(1, { message: "Passwords must be the same" }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must be the same",
        path: ["repeatPassword"],
      });
    }
  });
