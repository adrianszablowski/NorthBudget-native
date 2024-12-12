import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView className="flex h-screen items-center bg-red-300 px-2">
      <Center className="w-full bg-red-500 py-14">
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
      <Pressable onPress={() => i18n.changeLanguage("en")} className="w-full">
        <Text>Zmien jezyk</Text>
      </Pressable>
    </SafeAreaView>
  );
}
