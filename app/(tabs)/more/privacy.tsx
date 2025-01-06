import ChangePasswordForm from "@/components/my-profile/change-password-form";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="h-full bg-background-0">
      <Box className="px-3 py-2">
        <Heading size="md">{t("Change password")}</Heading>
        <Divider className="mb-2" />
        <ChangePasswordForm />
      </Box>
    </SafeAreaView>
  );
}
