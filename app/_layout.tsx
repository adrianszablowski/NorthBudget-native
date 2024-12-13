import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "@/localization/i18n";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </GluestackUIProvider>
  );
}
