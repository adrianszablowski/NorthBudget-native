import { Badge, BadgeText } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../card";
import { HStack } from "../hstack";

interface ExpenseProps {
  title: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export default function ExpenseCard({
  title,
  amount,
  dueDate,
  paid,
}: Readonly<ExpenseProps>) {
  const { t } = useTranslation();

  return (
    <Card variant="filled">
      <HStack className="justify-between">
        <VStack space="xs">
          <Text size="lg">{title}</Text>
          <Text className="text-background-500" size="sm">
            {t("Due date")}: {dueDate}
          </Text>
        </VStack>
        <VStack space="sm" className="items-end">
          <Text size="md" bold>
            {amount} PLN
          </Text>
          <Badge variant="outline" action={`${paid ? "success" : "error"}`}>
            <BadgeText>{paid ? t("Paid") : t("Unpaid")}</BadgeText>
          </Badge>
        </VStack>
      </HStack>
    </Card>
  );
}
