import ExpenseCard from "@/components/expenses/expense-card";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";

export default function Expenses() {
  const { t } = useTranslation();

  const expense = {
    title: "expense 1",
    amount: 10,
    dueDate: "10-10-2024",
    paid: true,
    standingOrder: true,
    standingOrderDate: "10-10-2026",
  };

  return (
    <SafeAreaView className="h-full bg-background-0">
      <Box className="px-3 py-2">
        <Text>{t("Below expenses")}</Text>
        <VStack className="my-3" space="sm">
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
            <FontAwesome name="plus" color="white" size={15} />
            <Text className="text-typography-0">{t("Create new expense")}</Text>
          </Button>
          <Text>
            {t("Left to pay")}:{" "}
            <Text bold className="text-error-500">
              40 PLN
            </Text>
          </Text>
        </VStack>
        <ScrollView className="h-full">
          <VStack space="md">
            <ExpenseCard expense={expense} />
            <ExpenseCard expense={expense} />
            <ExpenseCard expense={expense} />
            <ExpenseCard expense={expense} />
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
