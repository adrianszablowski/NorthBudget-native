import { createExpenseSchema } from "@/schemas/schema";
import { Expense } from "@/types/types";
import {
  add,
  formatISO,
  getDaysInMonth,
  getMonth,
  getYear,
  startOfDay,
  sub,
} from "date-fns";
import i18next from "i18next";
import isEmpty from "lodash/isEmpty";
import size from "lodash/size";
import sumBy from "lodash/sumBy";
import { ID, Query } from "react-native-appwrite";
import { z } from "zod";
import { config, databases } from "../appwrite";
import { getCurrentUser } from "./user";

export const getAllExpenses = async (date: Date) => {
  const currentYear = getYear(date);
  const currentMonth = getMonth(date);
  const daysInCurrentMonth = getDaysInMonth(
    new Date(currentYear, currentMonth),
  );

  const startDate = formatISO(
    startOfDay(new Date(currentYear, currentMonth, 1)),
  );

  const endDate = formatISO(
    startOfDay(new Date(currentYear, currentMonth, daysInCurrentMonth + 1)),
  );

  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [
        Query.equal("userId", user.$id),
        Query.greaterThanEqual("dueDate", startDate),
        Query.lessThan("dueDate", endDate),
      ],
    );

    return expenses.documents;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};

export const getExpensesFromLastTwelveMonths = async () => {
  const lastTwelveMonthsFromNow = formatISO(
    sub(new Date(), {
      months: 12,
    }),
  );

  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [
        Query.equal("userId", user.$id),
        Query.greaterThanEqual("dueDate", lastTwelveMonthsFromNow),
      ],
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

export const getCurrentMonthExpenses = async () => {
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());
  const daysInCurrentMonth = getDaysInMonth(
    new Date(currentYear, currentMonth),
  );

  const startDate = formatISO(
    startOfDay(new Date(currentYear, currentMonth, 1)),
  );

  const endDate = formatISO(
    startOfDay(new Date(currentYear, currentMonth, daysInCurrentMonth + 1)),
  );

  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [
        Query.equal("userId", user.$id),
        Query.greaterThanEqual("dueDate", startDate),
        Query.lessThan("dueDate", endDate),
      ],
    );

    const totalExpenses = !isEmpty(expenses.documents)
      ? sumBy(expenses.documents, "amount")
      : 0;

    return totalExpenses;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};

export const getUpcomingExpenses = async () => {
  const today = formatISO(startOfDay(new Date()));
  const sevenDaysFromNow = formatISO(add(today, { days: 7 }));

  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [
        Query.equal("userId", user.$id),
        Query.equal("paid", false),
        Query.greaterThanEqual("dueDate", today),
        Query.lessThanEqual("dueDate", sevenDaysFromNow),
      ],
    );

    const totalExpenses = !isEmpty(expenses.documents)
      ? size(expenses.documents)
      : 0;

    return totalExpenses;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};

export const getPrevMonthExpenses = async () => {
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());
  const daysInCurrentMonth = getDaysInMonth(
    new Date(currentYear, currentMonth),
  );

  const startDate = formatISO(
    sub(startOfDay(new Date(currentYear, currentMonth, 1)), {
      months: 1,
    }),
  );
  const endDate = formatISO(
    sub(
      startOfDay(new Date(currentYear, currentMonth, daysInCurrentMonth + 1)),
      {
        months: 1,
      },
    ),
  );

  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const expenses = await databases.listDocuments<Expense>(
      config.databaseId,
      config.expenseCollectionId,
      [
        Query.equal("userId", user.$id),
        Query.greaterThanEqual("dueDate", startDate),
        Query.lessThan("dueDate", endDate),
      ],
    );

    const totalExpenses = !isEmpty(expenses.documents)
      ? sumBy(expenses.documents, "amount")
      : 0;

    return totalExpenses;
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

    const { title, amount, category, dueDate, paid } = parsedData.data;

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
        standingOrder: false,
        standingOrderDate: null,
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

export const updateExpense = async (
  formData: z.output<typeof createExpenseSchema>,
  expenseId: string,
) => {
  try {
    const parsedData = createExpenseSchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const {
      title,
      amount,
      category,
      dueDate,
      paid,
      standingOrder,
      standingOrderDate,
    } = parsedData.data;

    const updatedExpense = await databases.updateDocument(
      config.databaseId,
      config.expenseCollectionId,
      expenseId,
      {
        title,
        amount,
        category,
        dueDate,
        paid,
        standingOrder,
        standingOrderDate,
      },
    );

    if (!updatedExpense) throw new Error(i18next.t("Expense update failed"));

    return {
      success: true,
      message: i18next.t("Expense was updated successfully"),
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
