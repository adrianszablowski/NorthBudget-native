import { createGoal } from "@/lib/api/goals";
import { createGoalSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import toNumber from "lodash/toNumber";
import toString from "lodash/toString";
import React, { useEffect } from "react";
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
import { AlertCircleIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { VStack } from "../ui/vstack";

interface ExpenseFormProps {
  goalId?: string;
}

export default function GoalForm({ goalId }: Readonly<ExpenseFormProps>) {
  const { t } = useTranslation();
  const { back } = useRouter();
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

  const onSubmit = async (formData: z.output<typeof createGoalSchema>) => {
    const { success, message } = await createGoal(formData);

    if (!success) {
      showToast("error", message);
    } else {
      showToast("success", message);
      back();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

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
                    onChangeText={(value) =>
                      onChange(value ? toNumber(value) : 0)
                    }
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
                    onChangeText={(value) =>
                      onChange(value ? toNumber(value) : 1)
                    }
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
        <Button onPress={handleSubmit(onSubmit)}>
          <When condition={isSubmitting}>
            <ButtonSpinner color={colors.white} />
          </When>
          <ButtonText>{t("Submit")}</ButtonText>
        </Button>
      </VStack>
    </>
  );
}
