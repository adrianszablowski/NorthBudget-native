import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: t("Settings"),
          headerBackButtonDisplayMode: "minimal",
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="my-profile"
        options={{
          headerShown: true,
          headerTitle: t("My profile"),
          headerBackButtonDisplayMode: "minimal",
          headerBackButtonMenuEnabled: false,
        }}
      />
    </Stack>
  );
}
