declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_APPWRITE_ENDPOINT: string;
    readonly EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_PLATFORM: string;
    readonly EXPO_PUBLIC_APPWRITE_DATABASE_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_GOAL_COLLECTION_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_CATEGORY_COLLECTION_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_EXPENSE_COLLECTION_ID: string;
  }
}
