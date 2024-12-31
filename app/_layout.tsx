import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "@/localization/i18n";
import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar />
    </GluestackUIProvider>
  );
}
