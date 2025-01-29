import {
  IModalProps,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { createCategory } from "@/lib/api/categories";
import { createCategorySchema } from "@/schemas/schema";
import { queryKeys } from "@/types/query-keys";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { showToast } from "../toast/show-toast";
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
import SubmitFormButton from "../ui/submit-form-button";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

interface AdditionalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type CreateCategoryModalProps = AdditionalProps & IModalProps;

export default function CreateCategoryModal(props: CreateCategoryModalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showModal, setShowModal } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });

      if (success) {
        showToast("success", message);
        setShowModal(false);
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const onSubmit = async (formData: z.output<typeof createCategorySchema>) => {
    createMutation.mutate(formData);
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
            {t("Create category")}
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
              {t("You are creating a new category")}
            </Text>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <VStack space="xs">
                  <FormControl isInvalid={!!errors.title}>
                    <FormControlLabel>
                      <FormControlLabelText>
                        {t("Category name")}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        {errors.title?.message}
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                </VStack>
              )}
            />
            <SubmitFormButton
              onPress={handleSubmit(onSubmit)}
              title={t("Submit")}
              showButtonSpinnerCondition={
                isSubmitting || createMutation.isPending
              }
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
