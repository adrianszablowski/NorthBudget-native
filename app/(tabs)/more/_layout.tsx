import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: t("More") }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: t("Settings"),
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerShown: true,
          headerTitle: t("Privacy and security"),
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="my-profile"
        options={{
          headerShown: true,
          headerTitle: t("My profile"),
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
