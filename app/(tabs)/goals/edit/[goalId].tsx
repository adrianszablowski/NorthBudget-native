import GoalForm from "@/components/goals/goal-form";
import { Box } from "@/components/ui/box";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function EditGoal() {
  const { goalId } = useLocalSearchParams();

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <Box className="px-3 py-2">
        <GoalForm goalId={goalId[0]} />
      </Box>
    </SafeAreaView>
  );
}
