import ExpenseForm from "@/components/expenses/expense-form";
import { Box } from "@/components/ui/box";
import React from "react";
import { SafeAreaView } from "react-native";

export default function CreateExpense() {
  return (
    <SafeAreaView className="h-screen bg-background-0">
      <Box className="px-3 py-2">
        <ExpenseForm />
      </Box>
    </SafeAreaView>
  );
}
