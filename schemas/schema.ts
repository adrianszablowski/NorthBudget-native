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

export const changeUserDetailsSchema = z.object({
  username: z.string().min(1, { message: i18next.t("Username is required") }),
});

export const changeCurrencySchema = z.object({
  currency: z.enum(["EUR", "USD", "PLN"]),
});

export const createGoalSchema = z.object({
  title: z.string().min(1, { message: i18next.t("Title is required") }),
  amountCollected: z
    .number()
    .min(0, { message: i18next.t("Amount collected cannot be less than 0") }),
  amountToCollect: z
    .number()
    .min(1, { message: i18next.t("Amount collected cannot be less than 1") }),
});
