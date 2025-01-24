import { getAllCategories } from "@/lib/api/categories";
import { createExpense, getExpense, updateExpense } from "@/lib/api/expenses";
import { createExpenseSchema } from "@/schemas/schema";
import { Category } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import map from "lodash/map";
import toNumber from "lodash/toNumber";
import toString from "lodash/toString";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { When } from "react-if";
import { View } from "react-native";
import colors from "tailwindcss/colors";
import { z } from "zod";
import CreateCategoryModal from "../categories/create-category-modal";
import { showToast } from "../toast/show-toast";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { HStack } from "../ui/hstack";
import { AddIcon, AlertCircleIcon, EditIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui/select";
import SubmitFormButton from "../ui/submit-form-button";
import { Switch } from "../ui/switch";
import { VStack } from "../ui/vstack";

interface ExpenseFormProps {
  expenseId?: string;
}

export default function ExpenseForm({ expenseId }: Readonly<ExpenseFormProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { back } = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: expenseData } = useQuery({
    queryKey: ["getExpense"],
    queryFn: () => getExpense(expenseId!),
    enabled: !!expenseId,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      title: !!expenseId && expenseData ? expenseData.title : "",
      amount: !!expenseId && expenseData ? expenseData.amount : 0,
      category: !!expenseId && expenseData ? expenseData.category.$id : "",
      dueDate:
        !!expenseId && expenseData ? new Date(expenseData.dueDate) : new Date(),
      paid: !!expenseId && expenseData ? expenseData.paid : false,
      standingOrder:
        !!expenseId && expenseData ? expenseData.standingOrder : false,
      standingOrderDate:
        !!expenseId && expenseData?.standingOrderDate
          ? new Date(expenseData.standingOrderDate)
          : new Date(),
    },
  });

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
      formData: z.output<typeof createExpenseSchema>;
      id: string;
    }) => updateExpense(formData, id),
    onSuccess: ({ success, message }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
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

  const onSubmit = async (formData: z.output<typeof createExpenseSchema>) => {
    if (!expenseId) {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ formData, id: expenseId });
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
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.category}>
                <HStack space="sm" className="mb-2">
                  <FormControlLabel className="flex h-full items-end">
                    <FormControlLabelText>{t("Category")}</FormControlLabelText>
                  </FormControlLabel>
                  <Button size="xs" onPress={() => setShowModal(true)}>
                    <ButtonIcon as={AddIcon} />
                    <ButtonText>{t("Create category")}</ButtonText>
                  </Button>
                </HStack>
                <Select onValueChange={onChange} selectedValue={value}>
                  <SelectTrigger variant="outline" size="md">
                    <SelectInput placeholder={t("Select category")} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className="pb-10">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {map(categoriesData, (category: Category) => (
                        <SelectItem
                          key={category.$id}
                          label={category.title}
                          value={category.$id}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.category?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.dueDate}>
                <FormControlLabel>
                  <FormControlLabelText>{t("Due date")}</FormControlLabelText>
                </FormControlLabel>
                <View className="w-full">
                  <RNDateTimePicker
                    mode="date"
                    value={value}
                    onChange={(_event, date) => onChange(date)}
                  />
                </View>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.dueDate?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <Controller
          name="paid"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.paid}>
                <HStack space="md">
                  <Switch
                    trackColor={{
                      false: colors.gray[300],
                      true: colors.blue[500],
                    }}
                    ios_backgroundColor={colors.gray[300]}
                    value={value}
                    onValueChange={onChange}
                  />
                  <FormControlLabel>
                    <FormControlLabelText>{t("Paid")}</FormControlLabelText>
                  </FormControlLabel>
                </HStack>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.paid?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <Controller
          name="standingOrder"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <VStack space="xs">
              <FormControl isInvalid={!!errors.standingOrder}>
                <HStack space="md">
                  <Switch
                    trackColor={{
                      false: colors.gray[300],
                      true: colors.blue[500],
                    }}
                    ios_backgroundColor={colors.gray[300]}
                    value={value}
                    onValueChange={onChange}
                  />
                  <FormControlLabel>
                    <FormControlLabelText>
                      {t("Standing order")}
                    </FormControlLabelText>
                  </FormControlLabel>
                </HStack>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {errors.standingOrder?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            </VStack>
          )}
        />
        <When condition={watch("standingOrder")}>
          <Controller
            name="standingOrderDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <VStack space="xs">
                <FormControl isInvalid={!!errors.standingOrderDate}>
                  <FormControlLabel>
                    <FormControlLabelText>
                      {t("Standing order date")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <View className="w-full">
                    <RNDateTimePicker
                      mode="date"
                      value={value}
                      onChange={(_event, date) => onChange(date)}
                      minimumDate={watch("dueDate")}
                    />
                  </View>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {errors.standingOrderDate?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </VStack>
            )}
          />
        </When>
        <SubmitFormButton
          onPress={handleSubmit(onSubmit)}
          title={t("Submit")}
          buttonIcon={EditIcon}
          showButtonSpinnerCondition={
            isSubmitting || createMutation.isPending || updateMutation.isPending
          }
        />
      </VStack>
      <CreateCategoryModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
