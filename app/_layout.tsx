import "@/global.css";
import "@/localization/i18n";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    RobotoRegular: require("@/assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("@/assets/fonts/Roboto-Thin.ttf"),
    RobotoThinItalic: require("@/assets/fonts/Roboto-ThinItalic.ttf"),
    RobotoMedium: require("@/assets/fonts/Roboto-Medium.ttf"),
    RobotoMediumItalic: require("@/assets/fonts/Roboto-MediumItalic.ttf"),
    RobotoLight: require("@/assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("@/assets/fonts/Roboto-LightItalic.ttf"),
    RobotoItalic: require("@/assets/fonts/Roboto-Italic.ttf"),
    RobotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItalic: require("@/assets/fonts/Roboto-BoldItalic.ttf"),
    RobotoBlack: require("@/assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("@/assets/fonts/Roboto-BlackItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
