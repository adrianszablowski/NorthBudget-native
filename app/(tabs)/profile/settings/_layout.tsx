import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SettingsLayout() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: t("Settings"),
        headerLeft: () => (
          <AntDesign name="arrowleft" size={22} onPress={() => router.back()} />
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
