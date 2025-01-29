import { Category } from "@/types/types";
import { UseQueryResult } from "@tanstack/react-query";
import map from "lodash/map";
import orderBy from "lodash/orderBy";
import size from "lodash/size";
import take from "lodash/take";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import colors from "tailwindcss/colors";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { InfoIcon } from "../ui/icon";
import { Skeleton } from "../ui/skeleton";
import { VStack } from "../ui/vstack";

const COLOR_PALETTE = [
  colors.red[600],
  colors.blue[600],
  colors.green[600],
  colors.yellow[600],
  colors.purple[600],
];

interface ExpensesByCategoryCardProps {
  categories: UseQueryResult<Category[], Error>;
}

export default function ExpensesByCategoryCard({
  categories,
}: Readonly<ExpensesByCategoryCardProps>) {
  const { t } = useTranslation();

  const { data: categoriesData, isLoading, isError } = categories;

  const sortedCategories = useMemo(
    () =>
      orderBy(
        categoriesData,
        [(category) => size(category.expenses)],
        ["desc"],
      ),
    [categoriesData],
  );

  const fiveMostUsedCategories = useMemo(
    () =>
      take(
        map(sortedCategories, (category, index) => {
          return {
            name: category.title,
            expenseCount: size(category.expenses),
            color: COLOR_PALETTE[index % COLOR_PALETTE.length],
          };
        }),
        5,
      ),
    [sortedCategories],
  );

  return (
    <Card variant="outline" className="overflow-hidden">
      <VStack space="md">
        <Heading size="sm">{t("Five most frequently used categories")}</Heading>
        <View>
          <If condition={isLoading}>
            <Then>
              <Skeleton variant="rounded" className="h-60 w-full" />
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
                  <PieChart
                    data={fiveMostUsedCategories}
                    width={Dimensions.get("window").width - 24}
                    height={220}
                    chartConfig={{
                      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                      useShadowColorFromDataset: false,
                    }}
                    accessor="expenseCount"
                    backgroundColor="transparent"
                    paddingLeft="0"
                  />
                </Else>
              </If>
            </Else>
          </If>
        </View>
      </VStack>
    </Card>
  );
}
