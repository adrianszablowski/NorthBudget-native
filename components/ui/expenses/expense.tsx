import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

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
  return (
    <Box className="w-full flex-row items-center justify-between rounded-md bg-background-100 px-5 py-2">
      <VStack space="xs">
        <Text size="lg">{title}</Text>
        <Text className="text-background-500" size="sm">
          Due: {dueDate}
        </Text>
      </VStack>
      <VStack space="sm">
        <Text size="md" bold>
          {amount} PLN
        </Text>
        <Badge variant="outline" action={`${paid ? "success" : "error"}`}>
          <BadgeText>{paid ? "Paid" : "Unpaid"}</BadgeText>
        </Badge>
      </VStack>
    </Box>
  );
}
