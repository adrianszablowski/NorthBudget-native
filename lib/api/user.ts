import {
  changeCurrencySchema,
  changeUserDetailsSchema,
} from "@/schemas/schema";
import { Result } from "@/types/types";
import i18next from "i18next";
import { Models, Query } from "react-native-appwrite";
import { z } from "zod";
import { account, config, databases } from "../appwrite";

export const getCurrentUser = async (): Promise<Models.Document> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const setUserDetails = async (
  formData: z.output<typeof changeUserDetailsSchema>,
): Promise<Result<Models.Document>> => {
  try {
    const parsedData = changeUserDetailsSchema.safeParse(formData);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const currentAccount = account.get();

    if (!currentAccount) throw Error;

    const newAccountName = await account.updateName(parsedData.data.username);

    if (!newAccountName)
      return { success: false, message: i18next.t("Username changed failed") };

    const newUsername = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      (await currentAccount).$id,
      {
        username: parsedData.data.username,
      },
    );

    if (!newUsername)
      return { success: false, message: i18next.t("Username changed failed") };

    return {
      success: true,
      message: i18next.t("Username was changed successfully"),
      data: newUsername,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const setUserCurrency = async (
  currency: z.output<typeof changeCurrencySchema>,
): Promise<Result<Models.Document>> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const parsedData = changeCurrencySchema.safeParse(currency);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const changedCurrency = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      currentAccount.$id,
      {
        currency: parsedData.data.currency,
      },
    );

    if (!changedCurrency)
      return { success: false, message: i18next.t("Currency changed failed") };

    return {
      success: true,
      message: i18next.t("Currency was changed successfully"),
      data: changedCurrency,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
