import GoalCard from "@/components/goals/goal-card";
import { VStack } from "@/components/ui/vstack";
import map from "lodash/map";
import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function Goals() {
  const [goalsData] = useState([
    {
      id: "1",
      title: "Trip to Japan",
      amount: 1200,
      goalAmout: 5000,
    },
    {
      id: "2",
      title: "Kitchen Renovation",
      amount: 3000,
      goalAmout: 10000,
    },
    {
      id: "3",
      title: "Emergency Fund",
      amount: 500,
      goalAmout: 2000,
    },
    {
      id: "4",
      title: "Wedding Gift",
      amount: 150,
      goalAmout: 1000,
    },
    {
      id: "5",
      title: "New Laptop",
      amount: 800,
      goalAmout: 3000,
    },
    {
      id: "6",
      title: "Car Down Payment",
      amount: 1500,
      goalAmout: 5000,
    },
  ]);

  return (
    <SafeAreaView className="h-full bg-background-0">
      <ScrollView className="h-full px-3 py-2">
        <VStack space="md" className="pb-2">
          {map(goalsData, (goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
