import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView className="bg-background flex h-screen items-center px-3">
      <Center className="w-full py-14">
        <Avatar size="2xl" className="mb-5">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
          <AvatarBadge className="border-white bg-green-500" />
        </Avatar>
        <Text size="2xl" bold>
          Adrian Szabłowski
        </Text>
      </Center>
      <Box className="w-full">
        <Pressable className="w-full">
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-muted"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <AntDesign name="setting" size={24} />
              <Text>Zmien jezyk</Text>
            </Box>
          )}
        </Pressable>
      </Box>
    </SafeAreaView>
  );
}
