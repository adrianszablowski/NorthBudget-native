import { FontAwesome } from "@expo/vector-icons";
import toLower from "lodash/toLower";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function ActiveGoalsCard() {
  const { t } = useTranslation();

  return (
    <Card variant="outline">
      <VStack space="md">
        <HStack className="justify-between">
          <Heading size="sm">{t("Active goals")}</Heading>
          <FontAwesome name="trophy" size={13} />
        </HStack>
        <VStack>
          <Text size="2xl" bold>
            8
          </Text>
          <Text size="sm" className="text-typography-500">
            2 {toLower(t("Goals near completion"))}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}
