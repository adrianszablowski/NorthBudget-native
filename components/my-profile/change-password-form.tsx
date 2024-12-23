import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { EditIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function ChangePasswordForm() {
  const { t } = useTranslation();

  return (
    <VStack space="sm">
      <VStack space="xs">
        <Text className="text-typography-500">{t("Old password")}</Text>
        <Input>
          <InputField type="password" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("New password")}</Text>
        <Input>
          <InputField type="password" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Repeat new password")}</Text>
        <Input>
          <InputField type="password" />
        </Input>
      </VStack>
      <Button>
        <ButtonIcon as={EditIcon} />
        <ButtonText>{t("Save")}</ButtonText>
      </Button>
    </VStack>
  );
}
