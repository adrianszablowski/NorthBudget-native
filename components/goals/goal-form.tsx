import { createGoal, getGoal, updateGoal } from "@/lib/api/goals";
import { createGoalSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import toString from "lodash/toString";
import React, { useEffect } from "react";
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
import { AlertCircleIcon, EditIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import SubmitFormButton from "../ui/submit-form-button";
import { VStack } from "../ui/vstack";

interface ExpenseFormProps {
  goalId?: string;
}

export default function GoalForm({ goalId }: Readonly<ExpenseFormProps>) {
  const { t } = useTranslation();
  const { back } = useRouter();
  const queryClient = useQueryClient();

  const { data: goalData } = useQuery({
    queryKey: ["goal"],
    queryFn: () => getGoal(goalId!),
    enabled: !!goalId,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      amountCollected: 0,
      amountToCollect: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      back();

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

  const updateMutation = useMutation({
    mutationFn: ({
      formData,
      id,
    }: {
      formData: z.output<typeof createGoalSchema>;
      id: string;
    }) => updateGoal(formData, id),
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      back();

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

  const onSubmit = async (formData: z.output<typeof createGoalSchema>) => {
    if (!goalId) {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ formData, id: goalId });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();

    if (goalId) {
      reset({
        title: !!goalId && goalData ? goalData.title : "",
        amountCollected: !!goalId && goalData ? goalData.amountCollected : 0,
        amountToCollect: !!goalId && goalData ? goalData.amountToCollect : 0,
      });
    }
  }, [goalData, goalId, isSubmitSuccessful, reset]);

  return (
    <>
      <VStack space="lg" className="w-full max-w-[500px]">
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.title}>
                <FormControlLabel>
                  <FormControlLabelText>{t("Title")}</FormControlLabelText>
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
        <Controller
          name="amountCollected"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.amountCollected}>
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("Amount currently collected")}
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    keyboardType="numeric"
                    value={toString(value)}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.amountCollected?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <Controller
          name="amountToCollect"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.amountToCollect}>
                <FormControlLabel>
                  <FormControlLabelText>
                    {t("Amount to collect")}
                  </FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    keyboardType="numeric"
                    value={toString(value)}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.amountToCollect?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <SubmitFormButton
          onPress={handleSubmit(onSubmit)}
          title={t("Submit")}
          buttonIcon={goalId ? EditIcon : undefined}
          showButtonSpinnerCondition={
            isSubmitting || createMutation.isPending || updateMutation.isPending
          }
        />
      </VStack>
    </>
  );
}
