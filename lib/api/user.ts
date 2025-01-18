import { changeUserDetailsSchema } from "@/schemas/schema";
import { Result } from "@/types/types";
import i18next from "i18next";
import { Models, Query } from "react-native-appwrite";
import { z } from "zod";
import { account, config, databases } from "../appwrite";

export const getCurrentUser = async (): Promise<Models.Document> => {
  try {
    const currentAccount = account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", (await currentAccount).$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const setUserDetails = async (
  formData: z.output<typeof changeUserDetailsSchema>,
  userId: string | undefined,
): Promise<Result<Models.Document>> => {
  if (!userId)
    return {
      success: false,
      message: i18next.t("User Id is missing"),
    };

  try {
    const parsedData = changeUserDetailsSchema.safeParse(formData);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const newAccountName = await account.updateName(parsedData.data.username);

    if (!newAccountName)
      return { success: false, message: i18next.t("Username changed failed") };

    const newUsername = await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      userId,
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
