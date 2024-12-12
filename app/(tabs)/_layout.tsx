import { HapticTab } from "@/components/ui/HapticTab";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#968",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("Dashboard"),
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: t("Expenses"),
          tabBarIcon: ({ color }) => (
            <AntDesign name="creditcard" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: t("Profile"),
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
