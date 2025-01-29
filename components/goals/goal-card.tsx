import { deleteGoal } from "@/lib/api/goals";
import { Goal } from "@/types/types";
import calculateGoalProgress from "@/utils/calculate-goal-progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import toLower from "lodash/toLower";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast/show-toast";
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
import AddFundsModal from "./add-funds-modal";

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: Readonly<GoalCardProps>) {
  const { t } = useTranslation();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showFundsModal, setShowFundsModal] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });

      if (success) {
        showToast("success", message);
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const { $id, title, amountCollected, amountToCollect } = goal;

  const goalProgress = calculateGoalProgress(amountCollected, amountToCollect);

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Card variant="outline">
          <VStack space="lg">
            <Heading size="xl">{title}</Heading>
            <HStack className="justify-between">
              <Amount amount={amountCollected} bold size="xl" />
              <HStack space="xs">
                <Text className="text-typography-700">{t("Of")}</Text>
                <Amount
                  amount={amountToCollect}
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
            <Button onPress={() => setShowFundsModal(true)}>
              <ButtonIcon as={AddIcon} />
              <ButtonText>{t("Add funds")}</ButtonText>
            </Button>
          </VStack>
        </Card>
      </Pressable>
      <AddFundsModal
        goal={goal}
        showModal={showFundsModal}
        setShowModal={setShowFundsModal}
      />
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
                push(`/goals/edit/${$id}`);
              }}
            >
              <ButtonIcon as={EditIcon} />
              <ButtonText>{t("Edit")}</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={() => {
                deleteMutation.mutate($id);
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
