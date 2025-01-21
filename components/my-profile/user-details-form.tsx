import useUserContext from "@/hooks/user-user-context";
import { setUserDetails } from "@/lib/api/user";
import { changeUserDetailsSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
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

export default function UserDetailsForm() {
  const { t } = useTranslation();
  const { init, user } = useUserContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(changeUserDetailsSchema),
    defaultValues: {
      username: user ? user.username : "",
    },
  });

  const changeUserDetailsMutation = useMutation({
    mutationFn: setUserDetails,
    onSuccess: ({ success, message }) => {
      if (success) {
        showToast("success", message);
        init();
      } else {
        showToast("error", message);
      }
    },
    onError: ({ message }) => {
      showToast("error", message);
    },
  });

  const onSubmit = async (
    formData: z.output<typeof changeUserDetailsSchema>,
  ) => {
    changeUserDetailsMutation.mutate(formData);
  };

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
      <SubmitFormButton
        onPress={handleSubmit(onSubmit)}
        title={t("Save")}
        buttonIcon={EditIcon}
        showButtonSpinnerCondition={
          isSubmitting || changeUserDetailsMutation.isPending
        }
      />
    </VStack>
  );
}
