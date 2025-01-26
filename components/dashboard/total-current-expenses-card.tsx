import {
  getCurrentMonthExpenses,
  getPrevMonthExpenses,
} from "@/lib/api/expenses";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import toLower from "lodash/toLower";
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

export default function TotalCurrentExpensesCard() {
  const { t } = useTranslation();

  const {
    data: totalCurrentMonthExpenses,
    isLoading: totalCurrentMonthExpensesIsLoading,
    isError: totalCurrentMonthExpensesIsError,
  } = useQuery({
    queryKey: ["getTotalCurrentMonthExpenses"],
    queryFn: getCurrentMonthExpenses,
  });

  const {
    data: totalPrevMonthExpenses,
    isLoading: totalPrevMonthExpensesIsLoading,
    isError: totalPrevMonthExpensesIsError,
  } = useQuery({
    queryKey: ["getTotalPrevMonthExpenses"],
    queryFn: getPrevMonthExpenses,
  });

  const percentageDifference = (
    currExpenses: number,
    prevExpenses: number,
  ): string => {
    const difference = ((currExpenses - prevExpenses) / prevExpenses) * 100;

    return difference.toFixed(2);
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
              totalCurrentMonthExpensesIsLoading ||
              totalPrevMonthExpensesIsLoading
            }
          >
            <Then>
              <VStack space="sm">
                <Skeleton variant="rounded" className="h-8 w-1/4" />
                <SkeletonText className="h-3 w-1/3" />
              </VStack>
            </Then>
            <Else>
              {totalCurrentMonthExpensesIsError ||
              totalPrevMonthExpensesIsError ||
              !totalCurrentMonthExpenses ||
              !totalPrevMonthExpenses ? (
                <Alert action="error">
                  <AlertIcon as={InfoIcon} />
                  <AlertText size="sm">{t("Data download error")}</AlertText>
                </Alert>
              ) : (
                <>
                  <Amount
                    amount={totalCurrentMonthExpenses || 0}
                    bold
                    size="2xl"
                  />
                  <Text size="sm" className="text-typography-500">
                    {percentageDifference(
                      totalCurrentMonthExpenses,
                      totalPrevMonthExpenses,
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
