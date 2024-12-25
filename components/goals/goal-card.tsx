import calculateGoalProgress from "@/utils/calculate-goal-progress";
import toLower from "lodash/toLower";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Amount from "../ui/amount";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import GlobalModal from "../ui/global-modal";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { AddIcon, EditIcon, TrashIcon } from "../ui/icon";
import { Pressable } from "../ui/pressable";
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
  const [showModal, setShowModal] = useState(false);

  const { title, amount, goalAmout } = goal;

  const goalProgress = calculateGoalProgress(amount, goalAmout);

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
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
              <ButtonText>{t("Add funds")}</ButtonText>
            </Button>
          </VStack>
        </Card>
      </Pressable>
      <GlobalModal
        title={t("Goal options")}
        description={`${t("Manage payment of")} ${title}`}
        showModal={showModal}
        setShowModal={setShowModal}
        actions={
          <>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={EditIcon} />
              <ButtonText>{t("Edit")}</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={TrashIcon} />
              <ButtonText>{t("Delete")}</ButtonText>
            </Button>
          </>
        }
      />
    </>
  );
}
