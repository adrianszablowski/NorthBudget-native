import UserDetailsForm from "@/components/my-profile/user-details-form";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useUserContext from "@/hooks/user-user-context";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

export default function MyProfile() {
  const { t } = useTranslation();
  const { user } = useUserContext();

  return (
    <SafeAreaView className="h-full bg-background-0">
      <VStack space="lg" className="px-3 py-2">
        <HStack space="md">
          <Avatar size="xl">
            <AvatarFallbackText>{user?.name}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge />
          </Avatar>
          <VStack>
            <Text size="2xl" bold>
              {user?.name}
            </Text>
            <Text className="text-typography-500">{user?.email}</Text>
          </VStack>
        </HStack>
        <VStack>
          <Heading size="md">{t("User details")}</Heading>
          <Divider className="mb-2" />
          <UserDetailsForm />
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
