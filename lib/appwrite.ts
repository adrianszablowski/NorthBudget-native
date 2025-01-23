import { Account, Avatars, Client, Databases } from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  plaftorm: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  goalCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GOAL_COLLECTION_ID,
  categoryCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID,
  expenseCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EXPENSE_COLLECTION_ID,
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.plaftorm);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
