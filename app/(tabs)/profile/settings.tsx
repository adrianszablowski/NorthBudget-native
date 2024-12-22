import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import LanguageActionsheet from "./_components/language-actionsheet";
import SelectCurrency from "./_components/select-currency";

export default function Settings() {
  const { t } = useTranslation();
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(false);

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <VStack className="px-3 py-2" space="xs">
        <HStack space="lg" className="items-center px-4 py-2">
          <FontAwesome name="money" size={24} />
          <SelectCurrency />
        </HStack>
        <Pressable className="w-full" onPress={() => setShowActionsheet(true)}>
          {({ pressed }) => (
            <HStack
              className={`${pressed && "bg-primary-50"} rounded-md px-4 py-4`}
              space="lg"
            >
              <FontAwesome name="flag" size={24} />
              <Text>{t("Change language")}</Text>
            </HStack>
          )}
        </Pressable>
        <Pressable className="w-full">
          {({ pressed }) => (
            <HStack
              className={`${pressed && "bg-error-50"} rounded-md px-4 py-4`}
              space="lg"
            >
              <FontAwesome name="sign-out" size={24} color="#e63535" />
              <Text className="text-error-500">{t("Log out")}</Text>
            </HStack>
          )}
        </Pressable>
        <LanguageActionsheet
          showActionsheet={showActionsheet}
          handleClose={handleClose}
        />
      </VStack>
    </SafeAreaView>
  );
}
