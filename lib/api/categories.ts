import { createCategorySchema } from "@/schemas/schema";
import { Category } from "@/types/types";
import i18next from "i18next";
import { ID, Query } from "react-native-appwrite";
import { z } from "zod";
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

export const createCategory = async (
  formData: z.output<typeof createCategorySchema>,
) => {
  try {
    const parsedData = createCategorySchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const user = await getCurrentUser();

    if (!user) throw Error;

    const { title } = parsedData.data;

    const createdCategory = await databases.createDocument(
      config.databaseId,
      config.categoryCollectionId,
      ID.unique(),
      {
        title,
        user: user.$id,
      },
    );

    if (!createdCategory)
      throw new Error(i18next.t("Category creation failed"));

    return {
      success: true,
      message: i18next.t("Category was created successfully"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
