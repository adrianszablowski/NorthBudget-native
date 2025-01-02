import ExpenseForm from "@/components/expenses/exepense-form";
import { Box } from "@/components/ui/box";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function EditExpense() {
  const { expenseId } = useLocalSearchParams();

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <Box className="px-3 py-2">
        <ExpenseForm expenseId={expenseId[0]} />
      </Box>
    </SafeAreaView>
  );
}
