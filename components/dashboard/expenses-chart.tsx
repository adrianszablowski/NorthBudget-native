import { getExpensesFromLastTwelveMonths } from "@/lib/api/expenses";
import { useQuery } from "@tanstack/react-query";
import { isSameMonth, parseISO, subMonths } from "date-fns";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "tailwindcss/colors";
import { Skeleton } from "../ui/skeleton";

export default function ExpensesChart() {
  const { t } = useTranslation();

  const { data: expensesData, isLoading } = useQuery({
    queryKey: ["lastTwelveExpenses"],
    queryFn: getExpensesFromLastTwelveMonths,
  });

  const chartDataArray = useMemo((): number[] => {
    if (!expensesData) return Array(12).fill(0);

    const now = new Date();
    const lastTwelveMonths: Date[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = subMonths(now, i);
      lastTwelveMonths.push(date);
    }

    const totals = Array(12).fill(0);

    expensesData.forEach(({ dueDate, amount }) => {
      const expenseDate = parseISO(dueDate);
      for (let i = 0; i < lastTwelveMonths.length; i++) {
        if (isSameMonth(expenseDate, lastTwelveMonths[i])) {
          totals[i] += amount;
          break;
        }
      }
    });

    return totals;
  }, [expensesData]);

  if (isLoading)
    return <Skeleton variant="rounded" className="h-[220px] w-full" />;

  return (
    <View>
      <LineChart
        data={{
          labels: [
            t("Jan"),
            t("Feb"),
            t("Mar"),
            t("Apr"),
            t("May"),
            t("Jun"),
            t("Jul"),
            t("Aug"),
            t("Sep"),
            t("Oct"),
            t("Nov"),
            t("Dec"),
          ],
          datasets: [
            {
              data: chartDataArray,
            },
          ],
        }}
        width={Dimensions.get("window").width - 24}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: colors.blue[600],
          backgroundGradientFrom: colors.blue[600],
          backgroundGradientTo: colors.blue[400],
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => colors.white,
          style: {
            borderRadius: 6,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.blue[700],
          },
        }}
        bezier
        style={{
          borderRadius: 6,
        }}
      />
    </View>
  );
}
