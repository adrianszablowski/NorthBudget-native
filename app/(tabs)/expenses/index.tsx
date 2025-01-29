import ExpenseCard from "@/components/expenses/expense-card";
import Amount from "@/components/ui/amount";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getAllExpenses } from "@/lib/api/expenses";
import { queryKeys } from "@/types/query-keys";
import { Expense } from "@/types/types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import sumBy from "lodash/sumBy";
import React from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";
import colors from "tailwindcss/colors";

export default function Expenses() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const {
    data: expensesData,
    isLoading: isLoadingExpenses,
    refetch: refetchExpenses,
  } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpenses,
  });

  if (isLoadingExpenses) {
    return (
      <SafeAreaView className="h-full bg-background-0">
        <Center className="h-full pb-[60px]">
          <AntDesign
            name="loading1"
            size={50}
            color={colors.blue[600]}
            className="animate-spin"
          />
        </Center>
      </SafeAreaView>
    );
  }

  const leftToPay = sumBy(expensesData, function (expense: Expense) {
    if (!expense.paid) {
      return expense.amount;
    }

    return 0;
  });

  return (
    <SafeAreaView className="h-full bg-background-0">
      <If condition={!isEmpty(expensesData)}>
        <Then>
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
                <Text>
                  {t("Left to pay")}:{" "}
                  <Amount bold className="text-error-600" amount={leftToPay} />
                </Text>
              </VStack>
              <VStack space="md">
                {map(expensesData, (expense: Expense) => (
                  <ExpenseCard key={expense.$id} expense={expense} />
                ))}
              </VStack>
            </VStack>
          </ScrollView>
        </Then>
        <Else>
          <Center className="h-full pb-[60px]">
            <VStack space="md" className="items-center">
              <FontAwesome name="inbox" size={50} color={colors.neutral[300]} />
              <Text size="sm" className="px-20 text-center text-typography-400">
                {t("Empty expenses")}
              </Text>
              <Button onPress={() => push("/expenses/create")}>
                <ButtonIcon as={AddIcon} />
                <ButtonText>{t("Create new expense")}</ButtonText>
              </Button>
            </VStack>
          </Center>
        </Else>
      </If>
    </SafeAreaView>
  );
}
