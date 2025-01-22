import { getAllGoals } from "@/lib/api/goals";
import { Goal } from "@/types/types";
import calculateGoalProgress from "@/utils/calculate-goal-progress";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import forEach from "lodash/forEach";
import size from "lodash/size";
import toLower from "lodash/toLower";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { InfoIcon } from "../ui/icon";
import { Skeleton, SkeletonText } from "../ui/skeleton";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function ActiveGoalsCard() {
  const { t } = useTranslation();
  const [goalsNearCompletion, setGoalsNearCompletion] = useState<number>(0);

  const {
    data: goalsData,
    isLoading: goalsDataIsLoading,
    isError: goalsDataIsError,
  } = useQuery({
    queryKey: ["getGoals"],
    queryFn: getAllGoals,
  });

  useEffect(() => {
    forEach(goalsData, ({ amountCollected, amountToCollect }: Goal) => {
      const goalProgress = calculateGoalProgress(
        amountCollected,
        amountToCollect,
      );

      if (goalProgress > 70 && goalProgress < 100) {
        setGoalsNearCompletion((prev) => prev + 1);
      }
    });
  }, [goalsData]);

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Active goals")}</Heading>
          <FontAwesome name="trophy" size={13} />
        </HStack>
        <VStack>
          <If condition={goalsDataIsLoading}>
            <Then>
              <VStack space="sm">
                <Skeleton variant="rounded" className="h-8 w-1/4" />
                <SkeletonText className="h-3 w-1/3" />
              </VStack>
            </Then>
            <Else>
              <If condition={goalsDataIsError}>
                <Then>
                  <Alert action="error">
                    <AlertIcon as={InfoIcon} />
                    <AlertText size="sm">{t("Data download error")}</AlertText>
                  </Alert>
                </Then>
                <Else>
                  <Text size="2xl" bold>
                    {size(goalsData)}
                  </Text>
                  <Text size="sm" className="text-typography-500">
                    {goalsNearCompletion} {toLower(t("Goals near completion"))}
                  </Text>
                </Else>
              </If>
            </Else>
          </If>
        </VStack>
      </VStack>
    </Card>
  );
}
