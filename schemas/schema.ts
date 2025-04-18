import i18next from "i18next";
import isFinite from "lodash/isFinite";
import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: i18next.t("Email is invalid") })
      .min(1, { message: i18next.t("Email is required") }),
    username: z.string().min(1, { message: i18next.t("Username is required") }),
    password: z.string().min(8, {
      message: i18next.t("Password must have at least 8 characters"),
    }),
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

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: i18next.t("Password is required") }),
    newPassword: z.string().min(8, {
      message: i18next.t("Password must have at least 8 characters"),
    }),
    repeatNewPassword: z
      .string()
      .min(1, { message: i18next.t("Passwords must be the same") }),
  })
  .superRefine(({ newPassword, repeatNewPassword }, ctx) => {
    if (repeatNewPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: i18next.t("Passwords must be the same"),
        path: ["repeatNewPassword"],
      });
    }
  });

export const changeUserDetailsSchema = z.object({
  username: z.string().min(1, { message: i18next.t("Username is required") }),
});

export const changeCurrencySchema = z.object({
  currency: z.enum(["EUR", "USD", "PLN"]),
});

export const createGoalSchema = z.object({
  title: z.string().min(1, { message: i18next.t("Title is required") }),
  amountCollected: z.preprocess(
    (amount) => {
      if (typeof amount === "string") {
        return parseFloat(amount.replace(",", "."));
      }
      return amount;
    },
    z
      .number()
      .min(0, { message: i18next.t("Amount collected cannot be less than 0") })
      .refine((value) => isFinite(value), {
        message: i18next.t("Amount collected must be a valid number"),
      }),
  ),
  amountToCollect: z.preprocess(
    (amount) => {
      if (typeof amount === "string") {
        return parseFloat(amount.replace(",", "."));
      }
      return amount;
    },
    z
      .number()
      .min(1, { message: i18next.t("Amount to collect cannot be less than 1") })
      .refine((value) => isFinite(value), {
        message: i18next.t("Amount to collect must be a valid number"),
      }),
  ),
});

export const addFundsSchema = z.object({
  amount: z
    .number()
    .min(1, { message: i18next.t("Amount cannot be less than 1") }),
});

export const createExpenseSchema = z.object({
  title: z.string().min(1, { message: i18next.t("Title is required") }),
  amount: z.preprocess(
    (amount) => {
      if (typeof amount === "string") {
        return parseFloat(amount.replace(",", "."));
      }
      return amount;
    },
    z
      .number()
      .min(1, { message: i18next.t("Amount is required") })
      .refine((value) => isFinite(value), {
        message: i18next.t("Amount must be a valid number"),
      }),
  ),
  category: z.string().min(1, { message: i18next.t("Category is required") }),
  dueDate: z.coerce.date(),
  paid: z.boolean(),
  standingOrder: z.boolean(),
  standingOrderDate: z.coerce.date().optional(),
});

export const createCategorySchema = z.object({
  title: z.string().min(1, { message: i18next.t("Category name is required") }),
});
