import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function UpcomingExpensesCard() {
  const { t } = useTranslation();

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Upcoming expenses")}</Heading>
          <FontAwesome name="credit-card" size={13} />
        </HStack>
        <VStack>
          <Text size="2xl" bold>
            3
          </Text>
          <Text size="sm" className="text-typography-500">
            {t("Due within 7 days")}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}
