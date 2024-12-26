import GoalCard from "@/components/goals/goal-card";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { SafeAreaView, ScrollView } from "react-native";

export default function Goals() {
  const { t } = useTranslation();
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
      <ScrollView className="px-3 py-2">
        <VStack space="sm" className="h-full pb-[60px]">
          <Button>
            <ButtonIcon as={AddIcon} />
            <ButtonText>{t("Create new expense")}</ButtonText>
          </Button>
          <VStack space="md">
            <If condition={!isEmpty(goalsData)}>
              <Then>
                {map(goalsData, (goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </Then>
              <Else>
                <Text>Empty</Text>
              </Else>
            </If>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
