import { createExpenseSchema } from "@/schemas/schema";
import { Expense } from "@/types/types";
import i18next from "i18next";
import { ID, Query } from "react-native-appwrite";
import { z } from "zod";
import { config, databases } from "../appwrite";
import { getCurrentUser } from "./user";

export const getAllExpenses = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [Query.equal("userId", user.$id)],
    );

    return expenses.documents;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};

export const getExpense = async (expenseId: string) => {
  try {
    const expense = await databases.getDocument<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      expenseId,
    );

    return expense;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};

export const createExpense = async (
  formData: z.output<typeof createExpenseSchema>,
) => {
  try {
    const parsedData = createExpenseSchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const user = await getCurrentUser();

    if (!user) throw Error;

    const {
      title,
      amount,
      category,
      dueDate,
      paid,
      standingOrder,
      standingOrderDate,
    } = parsedData.data;

    const createdExpense = await databases.createDocument(
      config.databaseId,
      config.expenseCollectionId,
      ID.unique(),
      {
        title,
        amount,
        category,
        dueDate,
        paid,
        standingOrder,
        standingOrderDate,
        userId: user.$id,
      },
    );

    if (!createdExpense) throw new Error(i18next.t("Expense creation failed"));

    return {
      success: true,
      message: i18next.t("Expense was created successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const setPaidExpenseStatus = async (
  paid: boolean,
  expenseId: string,
) => {
  try {
    const updatedExpense = await databases.updateDocument(
      config.databaseId,
      config.expenseCollectionId,
      expenseId,
      {
        paid,
      },
    );

    if (!updatedExpense)
      throw new Error(i18next.t("Payment status change failed"));

    return {
      success: true,
      message: i18next.t("Expense status has been successfully changed"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const deleteExpense = async (expenseId: string) => {
  try {
    const deletedExpense = await databases.deleteDocument(
      config.databaseId,
      config.expenseCollectionId,
      expenseId,
    );

    if (!deletedExpense) throw new Error(i18next.t("Expense deletion failed"));

    return {
      success: true,
      message: i18next.t("Expense was deleted successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
