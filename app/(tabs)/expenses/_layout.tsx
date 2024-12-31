import { Stack } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ExpensesLayout() {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: t("Current expenses") }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          headerTitle: t("Create expense"),
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
