import { FontAwesome } from "@expo/vector-icons";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { InfoIcon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface UpcomingExpensesCardProps {
  upcomingExpenses: UseQueryResult<number, Error>;
}

export default function UpcomingExpensesCard({
  upcomingExpenses,
}: UpcomingExpensesCardProps) {
  const { t } = useTranslation();

  const { data: upcomingExpensesData, isLoading, isError } = upcomingExpenses;

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Upcoming expenses")}</Heading>
          <FontAwesome name="credit-card" size={13} />
        </HStack>
        <VStack>
          <If condition={isLoading}>
            <Then>
              <Skeleton variant="rounded" className="h-8 w-1/4" />
            </Then>
            <Else>
              <If condition={isError}>
                <Then>
                  <Alert action="error">
                    <AlertIcon as={InfoIcon} />
                    <AlertText size="sm">{t("Data download error")}</AlertText>
                  </Alert>
                </Then>
                <Else>
                  <Text size="2xl" bold>
                    {upcomingExpensesData ?? 0}
                  </Text>
                </Else>
              </If>
            </Else>
          </If>
          <Text size="sm" className="text-typography-500">
            {t("Due within 7 days")}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}
