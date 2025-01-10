declare namespace NodeJS {
  interface ProcessEnv {
    readonly EXPO_PUBLIC_APPWRITE_ENDPOINT: string;
    readonly EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_PLATFORM: string;
  }
}
