import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import colors from "tailwindcss/colors";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";

export default function ExpensesByCategoryCard() {
  const { t } = useTranslation();

  return (
    <Card variant="outline" className="overflow-hidden">
      <VStack space="md">
        <Heading size="sm">{t("Expenses by category")}</Heading>
        <View>
          <PieChart
            data={[
              {
                name: "Food",
                expenseCount: 65,
                color: colors.red[500],
              },
              {
                name: "Rent",
                expenseCount: 112,
                color: colors.green[700],
              },
              {
                name: "Entertainment",
                expenseCount: 86,
                color: colors.blue[600],
              },
              {
                name: "Transportation",
                expenseCount: 49,
                color: colors.fuchsia[500],
              },
              {
                name: "Utilities",
                expenseCount: 77,
                color: colors.violet[200],
              },
            ]}
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
        </View>
      </VStack>
    </Card>
  );
}
