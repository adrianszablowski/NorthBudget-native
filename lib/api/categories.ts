import { Category } from "@/types/types";
import i18next from "i18next";
import { Query } from "react-native-appwrite";
import { config, databases } from "../appwrite";
import { getCurrentUser } from "./user";

export const getAllCategories = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) throw Error;

    const categories = await databases.listDocuments<Category>(
      config.databaseId,
      config.categoryCollectionId,
      [Query.equal("user", user.$id)],
    );

    return categories.documents;
  } catch (error: any) {
    throw new Error(
      error?.message || i18next.t("An unexpected error occurred"),
    );
  }
};
