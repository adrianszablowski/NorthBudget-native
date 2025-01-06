import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

export default function Profile() {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <SafeAreaView className="flex h-full items-center bg-background-0">
      <Box className="w-full px-3 py-2">
        <Pressable className="w-full" onPress={() => push("/more/my-profile")}>
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-primary-50"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <FontAwesome name="user" size={24} />
              <Text>{t("My profile")}</Text>
            </Box>
          )}
        </Pressable>
        <Pressable className="w-full" onPress={() => push("/more/privacy")}>
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-primary-50"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <FontAwesome name="lock" size={24} />
              <Text>{t("Privacy and security")}</Text>
            </Box>
          )}
        </Pressable>
        <Pressable className="w-full" onPress={() => push("/more/settings")}>
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-primary-50"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <FontAwesome name="gear" size={24} />
              <Text>{t("Settings")}</Text>
            </Box>
          )}
        </Pressable>
      </Box>
    </SafeAreaView>
  );
}
