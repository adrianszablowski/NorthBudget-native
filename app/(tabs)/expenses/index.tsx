import ExpenseCard from "@/components/expenses/expense-card";
import Amount from "@/components/ui/amount";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Expense } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { SafeAreaView, ScrollView } from "react-native";
import colors from "tailwindcss/colors";

export default function Expenses() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const [expensesData] = useState<Expense[]>([
    {
      id: "1",
      title: "Monthly Rent",
      amount: 1800,
      category: "House",
      dueDate: "2025-01-05",
      paid: false,
      standingOrder: false,
      standingOrderDate: null,
    },
    {
      id: "2",
      title: "Electricity Bill",
      amount: 225.5,
      category: "House",
      dueDate: "2025-01-10",
      paid: true,
      standingOrder: false,
      standingOrderDate: null,
    },
    {
      id: "3",
      title: "Car Loan Installment",
      amount: 980,
      category: "Car",
      dueDate: "2025-01-15",
      paid: false,
      standingOrder: true,
      standingOrderDate: "2025-01-15",
    },
    {
      id: "4",
      title: "Phone Subscription",
      amount: 60,
      category: "Private",
      dueDate: "2025-01-20",
      paid: false,
      standingOrder: true,
      standingOrderDate: "2025-01-20",
    },
    {
      id: "5",
      title: "Internet and TV",
      amount: 90,
      category: "House",
      dueDate: "2025-01-25",
      paid: true,
      standingOrder: false,
      standingOrderDate: null,
    },
  ]);

  return (
    <SafeAreaView className="h-full bg-background-0">
      <If condition={!isEmpty(expensesData)}>
        <Then>
          <ScrollView className="px-3 py-2">
            <VStack space="sm" className="h-full pb-[60px]">
              <VStack space="sm">
                <Button onPress={() => push("/expenses/create")}>
                  <ButtonIcon as={AddIcon} />
                  <ButtonText>{t("Create new expense")}</ButtonText>
                </Button>
                <Text>
                  {t("Left to pay")}:{" "}
                  <Amount bold className="text-error-600" amount={40} />
                </Text>
              </VStack>
              <VStack space="md">
                {map(expensesData, (expense) => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </VStack>
            </VStack>
          </ScrollView>
        </Then>
        <Else>
          <Center className="h-full pb-[60px]">
            <VStack space="md" className="items-center">
              <FontAwesome name="inbox" size={50} color={colors.neutral[300]} />
              <Text size="sm" className="px-20 text-center text-typography-400">
                {t("Empty expenses")}
              </Text>
              <Button onPress={() => push("/expenses/create")}>
                <ButtonIcon as={AddIcon} />
                <ButtonText>{t("Create new expense")}</ButtonText>
              </Button>
            </VStack>
          </Center>
        </Else>
      </If>
    </SafeAreaView>
  );
}
