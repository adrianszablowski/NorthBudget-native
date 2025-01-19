import { createGoalSchema } from "@/schemas/schema";
import { Goal } from "@/types/types";
import i18next from "i18next";
import { ID, Query } from "react-native-appwrite";
import { z } from "zod";
import { account, config, databases } from "../appwrite";

export const getAllGoals = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const goals = await databases.listDocuments<Goal>(
      config.databaseId,
      config.goalCollectionId,
      [Query.equal("userId", currentAccount.$id)],
    );

    return goals.documents;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const getGoal = async (goalId: string) => {
  try {
    const goal = await databases.getDocument<Goal>(
      config.databaseId,
      config.goalCollectionId,
      goalId,
    );

    return {
      success: true,
      message: "",
      data: goal,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const createGoal = async (
  formData: z.output<typeof createGoalSchema>,
) => {
  try {
    const parsedData = createGoalSchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const { title, amountCollected, amountToCollect } = parsedData.data;

    const createdGoal = await databases.createDocument(
      config.databaseId,
      config.goalCollectionId,
      ID.unique(),
      {
        title,
        amountCollected,
        amountToCollect,
        userId: currentAccount.$id,
      },
    );

    if (!createdGoal) throw new Error(i18next.t("Goal creation failed"));

    return {
      success: true,
      message: i18next.t("Goal was created successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const updateGoal = async (
  formData: z.output<typeof createGoalSchema>,
  goalId: string,
) => {
  try {
    const parsedData = createGoalSchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const { title, amountCollected, amountToCollect } = parsedData.data;

    const updatedGoal = await databases.updateDocument(
      config.databaseId,
      config.goalCollectionId,
      goalId,
      {
        title,
        amountCollected,
        amountToCollect,
      },
    );

    if (!updatedGoal) throw new Error(i18next.t("Goal update failed"));

    return {
      success: true,
      message: i18next.t("Goal was updated successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const deletedGoal = await databases.deleteDocument(
      config.databaseId,
      config.goalCollectionId,
      goalId,
    );

    if (!deletedGoal) throw new Error(i18next.t("Goal deletion failed"));

    return {
      success: true,
      message: i18next.t("Goal was deleted successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
