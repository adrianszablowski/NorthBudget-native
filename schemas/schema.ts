import i18next from "i18next";
import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: i18next.t("Email is invalid") })
      .min(1, { message: i18next.t("Email is required") }),
    username: z.string().min(1, { message: i18next.t("Username is required") }),
    password: z
      .string()
      .min(8, { message: i18next.t("Password must have at least 8 letters") }),
    repeatPassword: z
      .string()
      .min(1, { message: i18next.t("Passwords must be the same") }),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: i18next.t("Passwords must be the same"),
        path: ["repeatPassword"],
      });
    }
  });

export const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: i18next.t("Email is invalid") })
    .min(1, { message: i18next.t("Email is required") }),
  password: z.string().min(1, { message: i18next.t("Password is required") }),
});
