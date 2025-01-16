import UserDetailsForm from "@/components/my-profile/user-details-form";
import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
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
            <AvatarImage
              source={{
                uri: user?.avatar,
              }}
              className="bg-white"
            />
            <AvatarBadge />
          </Avatar>
          <VStack>
            <Text size="2xl" bold>
              {user?.username}
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
