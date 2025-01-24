import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useUserContext from "@/hooks/user-user-context";
import { deleteExpense, setPaidExpenseStatus } from "@/lib/api/expenses";
import { Expense } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import trim from "lodash/trim";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { showToast } from "../toast/show-toast";
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
  expense: Expense;
}

export default function ExpenseCard({ expense }: Readonly<ExpenseProps>) {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const setPaymentStatus = useMutation({
    mutationFn: ({ paid, id }: { paid: boolean; id: string }) =>
      setPaidExpenseStatus(!paid, id),
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      if (success) {
        showToast("success", message);
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      if (success) {
        showToast("success", message);
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const {
    $id,
    title,
    amount,
    category,
    dueDate,
    paid,
    standingOrder,
    standingOrderDate,
  } = expense;

  return (
    <>
      <Pressable onPress={() => setShowModal(true)}>
        <Card variant="filled">
          <HStack className="items-center justify-between">
            <VStack space="xs">
              <Text size="lg">{trim(title)}</Text>
              <Text>{category.title}</Text>
              <Text className="text-typography-500" size="sm">
                {t("Due date")}: {format(dueDate, "yyyy-MM-dd")}
              </Text>
              {standingOrder && standingOrderDate && (
                <Text className="text-typography-500" size="sm">
                  {t("Standing order to")}:{" "}
                  {format(standingOrderDate, "yyyy-MM-dd")}
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
        description={`${t("Manage payment of")} ${amount} ${user?.currency} ${t("For")} ${title}`}
        actions={
          <>
            <Button
              variant="outline"
              onPress={() => {
                setShowModal(false);
                push(`/expenses/edit/${$id}`);
              }}
            >
              <ButtonIcon as={EditIcon} />
              <ButtonText>{t("Edit")}</ButtonText>
            </Button>
            <Button
              variant="outline"
              onPress={() => {
                setPaymentStatus.mutate({ paid, id: $id });
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
                deleteMutation.mutate($id);
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
                className={paid ? "text-success-600" : "text-error-600"}
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
