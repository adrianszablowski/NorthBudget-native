import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "tailwindcss/colors";

export default function ExpensesChart() {
  const { t } = useTranslation();

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
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 24}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: colors.blue[600],
          backgroundGradientFrom: colors.blue[600],
          backgroundGradientTo: colors.blue[400],
          decimalPlaces: 2,
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
