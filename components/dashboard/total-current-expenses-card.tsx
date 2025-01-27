import { FontAwesome } from "@expo/vector-icons";
import { UseQueryResult } from "@tanstack/react-query";
import toLower from "lodash/toLower";
import toNumber from "lodash/toNumber";
import React from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import Amount from "../ui/amount";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { InfoIcon } from "../ui/icon";
import { Skeleton, SkeletonText } from "../ui/skeleton";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface TotalCurrentExpensesCardProps {
  totalCurrentMonthExpenses: UseQueryResult<number, Error>;
  totalPrevMonthExpenses: UseQueryResult<number, Error>;
}

export default function TotalCurrentExpensesCard({
  totalCurrentMonthExpenses,
  totalPrevMonthExpenses,
}: Readonly<TotalCurrentExpensesCardProps>) {
  const { t } = useTranslation();

  const {
    data: totalCurrentExpensesData,
    isLoading: totalCurrentExpensesIsLoading,
    isError: totalCurrentExpensesIsError,
  } = totalCurrentMonthExpenses;
  const {
    data: totalPrevExpensesData,
    isLoading: totalPrevExpensesIsLoading,
    isError: totalPrevExpensesIsError,
  } = totalPrevMonthExpenses;

  const percentageDifference = (
    currExpenses: number,
    prevExpenses: number,
  ): number => {
    if (prevExpenses === 0) return 0;

    const difference = ((currExpenses - prevExpenses) / prevExpenses) * 100;

    return toNumber(difference.toFixed(2));
  };

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Total expenses this month")}</Heading>
          <FontAwesome name="dollar" size={13} />
        </HStack>
        <VStack>
          <If
            condition={
              totalCurrentExpensesIsLoading || totalPrevExpensesIsLoading
            }
          >
            <Then>
              <VStack space="sm">
                <Skeleton variant="rounded" className="h-8 w-1/4" />
                <SkeletonText className="h-3 w-1/3" />
              </VStack>
            </Then>
            <Else>
              {totalCurrentExpensesIsError || totalPrevExpensesIsError ? (
                <Alert action="error">
                  <AlertIcon as={InfoIcon} />
                  <AlertText size="sm">{t("Data download error")}</AlertText>
                </Alert>
              ) : (
                <>
                  <Amount
                    amount={totalCurrentExpensesData || 0}
                    bold
                    size="2xl"
                  />
                  <Text size="sm" className="text-typography-500">
                    {percentageDifference(
                      totalCurrentExpensesData ?? 0,
                      totalPrevExpensesData ?? 0,
                    )}
                    % {toLower(t("From last month"))}
                  </Text>
                </>
              )}
            </Else>
          </If>
        </VStack>
      </VStack>
    </Card>
  );
}
