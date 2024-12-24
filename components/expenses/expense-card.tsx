import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import trim from "lodash/trim";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Amount from "../ui/amount";
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
    id: string;
    title: string;
    amount: number;
    dueDate: string;
    paid: boolean;
    standingOrder: boolean;
    standingOrderDate: string | null;
  };
}

export default function ExpenseCard({ expense }: Readonly<ExpenseProps>) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const { title, amount, dueDate, paid, standingOrder, standingOrderDate } =
    expense;

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Card variant="filled">
          <HStack className="items-end justify-between">
            <VStack space="xs">
              <Text size="lg">{trim(title)}</Text>
              <Text className="text-background-500" size="sm">
                {t("Due date")}: {dueDate}
              </Text>
              {standingOrder && (
                <Text className="text-background-500" size="sm">
                  {t("Standing order to")}: {standingOrderDate}
                </Text>
              )}
            </VStack>
            <VStack space="sm" className="items-end">
              <Amount size="md" bold amount={amount} />
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
        title={t("Payment options")}
        description={`${t("Manage payment of")} ${amount} PLN ${t("For")} ${title}`}
        actions={
          <>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={EditIcon} />
              <ButtonText>{t("Edit")}</ButtonText>
            </Button>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={InfoIcon} />
              <ButtonText>
                {paid ? t("Set as unpaid") : t("Set as paid")}
              </ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonIcon as={TrashIcon} />
              <ButtonText>{t("Delete")}</ButtonText>
            </Button>
            <Text size="sm" className="pt-5">
              {t("Current status")}:{" "}
              <Text
                size="sm"
                className={paid ? "text-success-500" : "text-error-500"}
              >
                {paid ? t("Paid") : t("Unpaid")}
              </Text>
            </Text>
          </>
        }
      />
    </>
  );
}
