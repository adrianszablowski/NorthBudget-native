import { HapticTab } from "@/components/ui/HapticTab";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import colors from "tailwindcss/colors";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.slate[300],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 80,
          ...Platform.select({
            ios: { position: "absolute", backgroundColor: colors.blue[600] },
            default: { backgroundColor: colors.blue[600] },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t("Dashboard"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={22} />
          ),
          headerShown: true,
          headerTitle: t("Dashboard"),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: t("Expenses"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="credit-card" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: t("Goals"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="trophy" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t("More"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="ellipsis-v" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
