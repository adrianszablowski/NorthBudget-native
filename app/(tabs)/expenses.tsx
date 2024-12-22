import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";
import ExpenseCard from "../../components/ui/expenses/expense-card";

export default function Expenses() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="h-full bg-background-0">
      <Box className="px-3 py-2">
        <Text>{t("Below expenses")}</Text>
        <HStack className="my-3 justify-between">
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
        </HStack>
        <ScrollView className="h-full">
          <VStack space="md">
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={true}
            />
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={true}
            />
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={false}
            />
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={false}
            />
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={true}
            />
            <ExpenseCard
              title="expense 1"
              amount={10}
              dueDate="2024-10-10"
              paid={false}
            />
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
