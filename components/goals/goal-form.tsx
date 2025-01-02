import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonText } from "../ui/button";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface ExpenseFormProps {
  goalId?: string;
}

export default function GoalForm({ goalId }: Readonly<ExpenseFormProps>) {
  const { t } = useTranslation();
  const { back } = useRouter();

  return (
    <>
      <VStack space="lg" className="w-full max-w-[500px]">
        <VStack space="xs">
          <Text className="text-typography-500">{t("Title")}</Text>
          <Input>
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">
            {t("Amount currently collected")}
          </Text>
          <Input>
            <InputField type="text" keyboardType="numeric" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">{t("Amount to collect")}</Text>
          <Input>
            <InputField type="text" keyboardType="numeric" />
          </Input>
        </VStack>
        <Button onPress={() => back()}>
          <ButtonText>{t("Submit")}</ButtonText>
        </Button>
      </VStack>
    </>
  );
}
