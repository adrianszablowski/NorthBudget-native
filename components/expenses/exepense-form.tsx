import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import colors from "tailwindcss/colors";
import { Button, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { ChevronDownIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function ExpenseForm() {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <VStack space="md" className="w-full max-w-[500px]">
      <VStack space="xs">
        <Text className="text-typography-500">{t("Title")}</Text>
        <Input>
          <InputField type="text" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Amount")}</Text>
        <Input>
          <InputField type="text" keyboardType="numeric" />
        </Input>
      </VStack>
      <VStack space="xs">
        <Text className="text-typography-500">{t("Category")}</Text>
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder={t("Select category")} />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent className="pb-10">
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Car" value="1" />
              <SelectItem label="Home" value="2" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </VStack>
      <HStack space="md">
        <Switch
          trackColor={{ false: colors.gray[300], true: colors.blue[500] }}
          ios_backgroundColor={colors.gray[300]}
        />
        <Text size="sm">{t("Paid")}</Text>
      </HStack>
      <HStack space="md">
        <Switch
          trackColor={{ false: colors.gray[300], true: colors.blue[500] }}
          ios_backgroundColor={colors.gray[300]}
        />
        <Text size="sm">{t("Standing order")}</Text>
      </HStack>
      <Button onPress={() => push("/dashboard")}>
        <ButtonText>{t("Submit")}</ButtonText>
      </Button>
    </VStack>
  );
}
