import {
  changePasswordSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/schemas/schema";
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

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const { email, password, username } = parsedData.data;

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw new Error(i18next.t("Failed to create account"));

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

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const { email, password } = parsedData.data;

    const session = await account.createEmailPasswordSession(email, password);

    if (!session)
      throw new Error(i18next.t("There has been a problem logging in"));

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

export const changePassword = async (
  formData: z.output<typeof changePasswordSchema>,
): Promise<Result<Models.Preferences>> => {
  try {
    const parsedData = changePasswordSchema.safeParse(formData);

    if (!parsedData.success) throw new Error(i18next.t("Invalid data"));

    const { newPassword, oldPassword } = parsedData.data;

    const changedPassword = await account.updatePassword(
      newPassword,
      oldPassword,
    );

    if (!changedPassword) throw new Error(i18next.t("Password change failed"));

    return {
      success: true,
      message: i18next.t("Password has been successfully changed"),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || i18next.t("An unexpected error occurred"),
    };
  }
};
