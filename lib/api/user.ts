import {
  changeCurrencySchema,
  changeUserDetailsSchema,
} from "@/schemas/schema";
import { Result, User } from "@/types/types";
import i18next from "i18next";
import { Query } from "react-native-appwrite";
import { z } from "zod";
import { account, config, databases } from "../appwrite";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments<User>(
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
): Promise<Result<User>> => {
  try {
    const parsedData = changeUserDetailsSchema.safeParse(formData);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const user = await getCurrentUser();

    if (!user) throw Error;

    const newAccountName = await account.updateName(parsedData.data.username);

    if (!newAccountName) throw new Error(i18next.t("Username changed failed"));

    const newUsername = await databases.updateDocument<User>(
      config.databaseId,
      config.userCollectionId,
      user.$id,
      {
        username: parsedData.data.username,
      },
    );

    if (!newUsername) throw new Error(i18next.t("Username changed failed"));

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
): Promise<Result<User>> => {
  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const parsedData = changeCurrencySchema.safeParse(currency);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const changedCurrency = await databases.updateDocument<User>(
      config.databaseId,
      config.userCollectionId,
      user.$id,
      {
        currency: parsedData.data.currency,
      },
    );

    if (!changedCurrency) throw new Error(i18next.t("Currency changed failed"));

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
