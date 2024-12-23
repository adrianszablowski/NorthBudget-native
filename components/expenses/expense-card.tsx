import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import trim from "lodash/trim";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import GlobalModal from "../ui/global-modal";
import { HStack } from "../ui/hstack";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  InfoIcon,
  TrashIcon,
} from "../ui/icon";
import { Pressable } from "../ui/pressable";

interface ExpenseProps {
  expense: {
    title: string;
    amount: number;
    dueDate: string;
    paid: boolean;
  };
}

export default function ExpenseCard({ expense }: Readonly<ExpenseProps>) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const { title, amount, dueDate, paid } = expense;

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Card variant="filled">
          <HStack className="justify-between">
            <VStack space="xs">
              <Text size="lg">{trim(title)}</Text>
              <Text className="text-background-500" size="sm">
                {t("Due date")}: {dueDate}
              </Text>
            </VStack>
            <VStack space="sm" className="items-end">
              <Text size="md" bold>
                {amount} PLN
              </Text>
              <Badge variant="outline" action={`${paid ? "success" : "error"}`}>
                <BadgeText className="mr-1">
                  {paid ? t("Paid") : t("Unpaid")}
                </BadgeText>
                <BadgeIcon as={paid ? CheckIcon : CloseIcon} />
              </Badge>
            </VStack>
          </HStack>
        </Card>
      </Pressable>
      <GlobalModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Payment options"
        description="Manage payment of 10 PLN for Internet"
        actions={
          <>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={EditIcon} />
              <ButtonText>Edit payment</ButtonText>
            </Button>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={InfoIcon} />
              <ButtonText>Set as paid</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={TrashIcon} />
              <ButtonText>Delete payment</ButtonText>
            </Button>
            <Text size="sm" className="pt-5">
              Current status:{" "}
              <Text size="sm" className="text-red-500">
                Paid
              </Text>
            </Text>
          </>
        }
      />
    </>
  );
}
