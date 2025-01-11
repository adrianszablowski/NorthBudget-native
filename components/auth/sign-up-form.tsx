import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonText } from "../ui/button";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function SignUpForm() {
  const { t } = useTranslation();

  return (
    <VStack space="md" className="w-full max-w-[500px]">
      <VStack space="xs">
        <Text className="text-typography-500">{t("Email")}</Text>
        <Input>
          <InputField type="text" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Username")}</Text>
        <Input>
          <InputField type="text" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Password")}</Text>
        <Input>
          <InputField type="password" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Repeat password")}</Text>
        <Input>
          <InputField type="password" />
        </Input>
      </VStack>
      <Button>
        <ButtonText>{t("Sign up")}</ButtonText>
      </Button>
    </VStack>
  );
}
