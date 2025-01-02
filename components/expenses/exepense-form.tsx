import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { When } from "react-if";
import { View } from "react-native";
import colors from "tailwindcss/colors";
import CreateCategoryModal from "../categories/create-category-modal";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { AddIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface ExpenseFormProps {
  expenseId?: string;
}

export default function ExpenseForm({ expenseId }: Readonly<ExpenseFormProps>) {
  const { t } = useTranslation();
  const { back } = useRouter();
  const [isStandingOrder, setIsStandingOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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
          <Text className="text-typography-500">{t("Amount")}</Text>
          <Input>
            <InputField type="text" keyboardType="numeric" />
          </Input>
        </VStack>
        <VStack space="xs">
          <HStack space="sm">
            <Text className="text-typography-500">{t("Category")}</Text>
            <Button size="xs" onPress={() => setShowModal(true)}>
              <ButtonIcon as={AddIcon} />
              <ButtonText>{t("Create category")}</ButtonText>
            </Button>
          </HStack>
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder={t("Select category")} />
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
        <VStack space="xs">
          <Text className="text-typography-500">{t("Due date")}</Text>
          <View className="w-full">
            <RNDateTimePicker mode="date" value={new Date()} />
          </View>
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
            value={isStandingOrder}
            onToggle={(value) => setIsStandingOrder(value)}
          />
          <Text size="sm">{t("Standing order")}</Text>
        </HStack>
        <When condition={isStandingOrder}>
          <VStack space="xs">
            <Text className="text-typography-500">
              {t("Standing order date")}
            </Text>
            <View className="w-full">
              <RNDateTimePicker mode="date" value={new Date()} />
            </View>
          </VStack>
        </When>
        <Button onPress={() => back()}>
          <ButtonText>{t("Submit")}</ButtonText>
        </Button>
      </VStack>
      <CreateCategoryModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
