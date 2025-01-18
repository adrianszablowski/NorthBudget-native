import { toastConfig } from "@/components/toast/toast-config";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import UserContextProvider from "@/contexts/user-context";
import "@/global.css";
import "@/localization/i18n";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <GluestackUIProvider>
      <UserContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{
              headerShown: true,
              headerTitle: t("Sign in"),
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{
              headerShown: true,
              headerTitle: t("Sign up"),
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar />
        <Toast config={toastConfig} />
      </UserContextProvider>
    </GluestackUIProvider>
  );
}
