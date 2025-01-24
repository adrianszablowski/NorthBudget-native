import {
  IModalProps,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { addFunds } from "@/lib/api/goals";
import { addFundsSchema } from "@/schemas/schema";
import { Goal } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toNumber from "lodash/toNumber";
import toString from "lodash/toString";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { When } from "react-if";
import colors from "tailwindcss/colors";
import { z } from "zod";
import { showToast } from "../toast/show-toast";
import { Button, ButtonSpinner, ButtonText } from "../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Heading } from "../ui/heading";
import { AlertCircleIcon, CloseIcon, Icon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface AdditionalProps {
  goal: Goal;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type AddFundsModalProps = AdditionalProps & IModalProps;

export default function AddFundsModal(props: AddFundsModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(addFundsSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const addFundsMutation = useMutation({
    mutationFn: ({
      formData,
      amountCollected,
      id,
    }: {
      formData: z.output<typeof addFundsSchema>;
      amountCollected: number;
      id: string;
    }) => addFunds(formData, amountCollected, id),
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["getGoals", "goals"] });

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
    goal: { title, $id: goalId, amountCollected },
    showModal,
    setShowModal,
  } = props;

  const onSubmit = async (formData: z.output<typeof addFundsSchema>) => {
    addFundsMutation.mutate({ formData, amountCollected, id: goalId });
    setShowModal(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
      {...props}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {t("Add funds")}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack space="sm" className="w-full">
            <Text size="sm" className="text-typography-500">
              {t("Add funds fo goal")}: {title}
            </Text>
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <VStack space="xs">
                  <FormControl isInvalid={!!errors.amount}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("Amount")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        keyboardType="numeric"
                        value={toString(value)}
                        onChangeText={(value) =>
                          onChange(value ? toNumber(value) : 0)
                        }
                        onBlur={onBlur}
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.amount?.message}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </VStack>
              )}
            />
            <Button onPress={handleSubmit(onSubmit)}>
              <When condition={isSubmitting}>
                <ButtonSpinner color={colors.white} />
              </When>
              <ButtonText>{t("Submit")}</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
