import { HapticTab } from "@/components/ui/HapticTab";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#cbd5e1",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: { position: "absolute", backgroundColor: "#2563eb" },
          default: { backgroundColor: "#2563eb" },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Dashboard"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={22} />
          ),
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
        name="profile"
        options={{
          title: t("Profile"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
