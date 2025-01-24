import { Expense } from "@/types/types";
import i18next from "i18next";
import { Query } from "react-native-appwrite";
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
