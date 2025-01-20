import { signInFormSchema, signUpFormSchema } from "@/schemas/schema";
import { Result, User } from "@/types/types";
import i18next from "i18next";
import { ID, Models } from "react-native-appwrite";
import { z } from "zod";
import { account, avatars, config, databases } from "../appwrite";

export const signUp = async (
  formData: z.output<typeof signUpFormSchema>,
): Promise<Result<User>> => {
  try {
    const parsedData = signUpFormSchema.safeParse(formData);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const { email, password, username } = parsedData.data;

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount)
      return { success: false, message: i18next.t("Failed to create account") };

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument<User>(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return {
      data: newUser,
      success: true,
      message: i18next.t("Account successfully created"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const signIn = async (
  formData: z.output<typeof signInFormSchema>,
): Promise<Result<Models.Session>> => {
  try {
    const parsedData = signInFormSchema.safeParse(formData);

    if (!parsedData.success)
      return {
        success: false,
        message: parsedData.error.message || i18next.t("Invalid data"),
      };

    const { email, password } = parsedData.data;

    const session = await account.createEmailPasswordSession(email, password);

    return {
      data: session,
      success: true,
      message: i18next.t("You have been correctly logged in"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};

export const signOut = async (): Promise<Result<Models.Session>> => {
  try {
    await account.deleteSession("current");

    return {
      success: true,
      message: i18next.t("You have been correctly logged out"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
