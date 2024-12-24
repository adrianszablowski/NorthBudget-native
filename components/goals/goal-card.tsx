import calculateGoalProgress from "@/utils/calculate-goal-progress";
import toLower from "lodash/toLower";
import React from "react";
import { useTranslation } from "react-i18next";
import Amount from "../ui/amount";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { AddIcon } from "../ui/icon";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface GoalCardProps {
  goal: {
    id: string;
    title: string;
    amount: number;
    goalAmout: number;
  };
}

export default function GoalCard({ goal }: Readonly<GoalCardProps>) {
  const { t } = useTranslation();

  const { title, amount, goalAmout } = goal;

  const goalProgress = calculateGoalProgress(amount, goalAmout);

  return (
    <Card variant="outline">
      <VStack space="lg">
        <Heading size="xl">{title}</Heading>
        <HStack className="justify-between">
          <Amount amount={amount} bold size="xl" />
          <HStack space="xs">
            <Text className="text-typography-700">{t("Of")}</Text>
            <Amount
              amount={goalAmout}
              size="sm"
              className="text-typography-700"
            />
          </HStack>
        </HStack>
        <Progress value={goalProgress}>
          <ProgressFilledTrack />
        </Progress>
        <Text className="text-center" bold>
          {goalProgress}% {toLower(t("Completed"))}
        </Text>
        <Button>
          <ButtonIcon as={AddIcon} />
          <ButtonText>{t("Add founds")}</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
}
