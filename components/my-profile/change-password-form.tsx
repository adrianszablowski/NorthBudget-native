import { changePassword } from "@/lib/api/auth";
import { changePasswordSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

export default function ChangePasswordForm() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: ({ success, message }) => {
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

  const onSubmit = async (formData: z.output<typeof changePasswordSchema>) => {
    changePasswordMutation.mutate(formData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <VStack space="sm">
      <Controller
        name="oldPassword"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.oldPassword}>
              <FormControlLabel>
                <FormControlLabelText>{t("Old password")}</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.oldPassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.newPassword}>
              <FormControlLabel>
                <FormControlLabelText>{t("New password")}</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.newPassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        )}
      />
      <Controller
        name="repeatNewPassword"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.repeatNewPassword}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t("Repeat new password")}
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.repeatNewPassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        )}
      />
      <SubmitFormButton
        onPress={handleSubmit(onSubmit)}
        title={t("Submit")}
        buttonIcon={EditIcon}
        showButtonSpinnerCondition={
          isSubmitting || changePasswordMutation.isPending
        }
      />
    </VStack>
  );
}
