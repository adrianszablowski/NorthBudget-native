import { FontAwesome } from "@expo/vector-icons";
import toLower from "lodash/toLower";
import React from "react";
import { useTranslation } from "react-i18next";
import Amount from "../ui/amount";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function TotalCurrentExpensesCard() {
  const { t } = useTranslation();

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Total expenses this month")}</Heading>
          <FontAwesome name="dollar" size={13} />
        </HStack>
        <VStack>
          <Amount amount={1234} bold size="2xl" />
          <Text size="sm" className="text-typography-500">
            +20.1% {toLower(t("From last month"))}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}
