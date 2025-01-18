import useUserContext from "@/hooks/user-user-context";
import { setUserDetails } from "@/lib/api/auth";
import { changeUserDetailsSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function UserDetailsForm() {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(changeUserDetailsSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (
    formData: z.output<typeof changeUserDetailsSchema>,
  ) => {
    const { success, message } = await setUserDetails(formData, user?.$id);

    if (!success) {
      showToast("error", message);
    } else {
      showToast("success", message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <VStack space="sm">
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <VStack space="xs">
            <FormControl isInvalid={!!errors.username}>
              <FormControlLabel>
                <FormControlLabelText>{t("Username")}</FormControlLabelText>
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
                  {errors.username?.message}
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
        <ButtonText>{t("Save")}</ButtonText>
      </Button>
    </VStack>
  );
}
