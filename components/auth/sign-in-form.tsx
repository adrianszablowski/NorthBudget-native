import useUserContext from "@/hooks/user-user-context";
import { signIn } from "@/lib/api/auth";
import { signInFormSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
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
import { AlertCircleIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import SubmitFormButton from "../ui/submit-form-button";
import { VStack } from "../ui/vstack";

export default function SignInForm() {
  const { t } = useTranslation();
  const { init } = useUserContext();
  const { replace } = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: ({ success, message }) => {
      if (success) {
        init();
        showToast("success", message);
        replace("/dashboard");
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const onSubmit = async (formData: z.output<typeof signInFormSchema>) => {
    signInMutation.mutate(formData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <VStack space="md" className="w-full max-w-[500px]">
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText>{t("Email")}</FormControlLabelText>
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
                  {errors.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText>{t("Password")}</FormControlLabelText>
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
                  {errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>
        )}
      />
      <SubmitFormButton
        onPress={handleSubmit(onSubmit)}
        title={t("Sign in")}
        showButtonSpinnerCondition={isSubmitting || signInMutation.isPending}
      />
    </VStack>
  );
}
