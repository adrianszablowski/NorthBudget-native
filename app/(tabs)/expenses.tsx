import ExpenseCard from "@/components/expenses/expense-card";
import Amount from "@/components/ui/amount";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { map } from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";

export default function Expenses() {
  const { t } = useTranslation();
  const [expensesData] = useState([
    {
      id: "1",
      title: "Monthly Rent",
      amount: 1800,
      dueDate: "2025-01-05",
      paid: false,
      standingOrder: false,
      standingOrderDate: null,
    },
    {
      id: "2",
      title: "Electricity Bill",
      amount: 225.5,
      dueDate: "2025-01-10",
      paid: true,
      standingOrder: false,
      standingOrderDate: null,
    },
    {
      id: "3",
      title: "Car Loan Installment",
      amount: 980,
      dueDate: "2025-01-15",
      paid: false,
      standingOrder: true,
      standingOrderDate: "2025-01-15",
    },
    {
      id: "4",
      title: "Phone Subscription",
      amount: 60,
      dueDate: "2025-01-20",
      paid: false,
      standingOrder: true,
      standingOrderDate: "2025-01-20",
    },
    {
      id: "5",
      title: "Internet and TV",
      amount: 90,
      dueDate: "2025-01-25",
      paid: true,
      standingOrder: false,
      standingOrderDate: null,
    },
  ]);

  return (
    <SafeAreaView className="h-full bg-background-0">
      <ScrollView className="px-3 py-2">
        <VStack space="sm" className="h-full pb-[60px]">
          <VStack space="sm">
            {/* <HStack space="sm" className="items-center">
            <Button>
            <FontAwesome name="left" color="white" />
            </Button>
            <Text bold>December 2024</Text>
            <Button>
            <FontAwesome name="right" color="white" />
            </Button>
            </HStack> */}
            <Button>
              <ButtonIcon as={AddIcon} />
              <ButtonText>{t("Create new expense")}</ButtonText>
            </Button>
            <Text>
              {t("Left to pay")}:{" "}
              <Amount bold className="text-error-500" amount={40} />
            </Text>
          </VStack>
          <VStack space="md">
            {map(expensesData, (expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
