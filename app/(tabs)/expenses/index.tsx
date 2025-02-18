import ExpenseCard from "@/components/expenses/expense-card";
import Amount from "@/components/ui/amount";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getAllExpenses } from "@/lib/api/expenses";
import { queryKeys } from "@/types/query-keys";
import { Expense } from "@/types/types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { add, format, sub } from "date-fns";
import { useRouter } from "expo-router";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import sumBy from "lodash/sumBy";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import colors from "tailwindcss/colors";

export default function Expenses() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const {
    data: expensesData,
    isLoading: isLoadingExpenses,
    isFetching: isFetchingExpenses,
    refetch: refetchExpenses,
  } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: () => getAllExpenses(currentDate),
  });

  useEffect(() => {
    refetchExpenses();
  }, [currentDate, refetchExpenses]);

  const leftToPay = sumBy(expensesData, function (expense: Expense) {
    if (!expense.paid) {
      return expense.amount;
    }

    return 0;
  });

  return (
    <SafeAreaView className="h-full bg-background-0">
      <ScrollView
        className="px-3 py-2"
        refreshControl={
          <RefreshControl
            refreshing={isLoadingExpenses}
            onRefresh={refetchExpenses}
          />
        }
      >
        <VStack space="sm" className="h-full pb-[60px]">
          <VStack space="sm">
            <Button onPress={() => push("/expenses/create")}>
              <ButtonIcon as={AddIcon} />
              <ButtonText>{t("Create new expense")}</ButtonText>
            </Button>
            <HStack space="sm" className="justify-between">
              <Button
                onPress={() => {
                  setCurrentDate(
                    sub(currentDate, {
                      months: 1,
                    }),
                  );
                }}
              >
                <ButtonIcon as={ChevronLeftIcon} />
              </Button>
              <Card variant="filled" className="py-2">
                <Text>{format(currentDate, "LLLL")}</Text>
              </Card>
              <Button
                onPress={() => {
                  setCurrentDate(
                    add(currentDate, {
                      months: 1,
                    }),
                  );
                }}
              >
                <ButtonIcon as={ChevronRightIcon} />
              </Button>
            </HStack>
            <Text>
              {t("Left to pay")}:{" "}
              <Amount bold className="text-error-600" amount={leftToPay} />
            </Text>
          </VStack>
          <If condition={!isFetchingExpenses && !isLoadingExpenses}>
            <Then>
              <If condition={!isEmpty(expensesData)}>
                <Then>
                  <VStack space="md">
                    {map(expensesData, (expense: Expense) => (
                      <ExpenseCard key={expense.$id} expense={expense} />
                    ))}
                  </VStack>
                </Then>
                <Else>
                  <Center className="h-full">
                    <VStack space="md" className="items-center">
                      <FontAwesome
                        name="inbox"
                        size={50}
                        color={colors.neutral[300]}
                      />
                      <Text
                        size="sm"
                        className="px-20 text-center text-typography-400"
                      >
                        {t("No expenses this month")}
                      </Text>
                    </VStack>
                  </Center>
                </Else>
              </If>
            </Then>
            <Else>
              <Center className="h-full">
                <AntDesign
                  name="loading1"
                  size={50}
                  color={colors.blue[600]}
                  className="animate-spin"
                />
              </Center>
            </Else>
          </If>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
