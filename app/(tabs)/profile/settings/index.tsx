import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import LanguageActionsheet from "./_components/language-actionsheet";

export default function Settings() {
  const { t } = useTranslation();
  const [showActionsheet, setShowActionsheet] = useState(false);

  const handleClose = () => setShowActionsheet(false);

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <Box className="px-3 py-2">
        <Pressable className="w-full" onPress={() => setShowActionsheet(true)}>
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-primary-50"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <AntDesign name="flag" size={24} />
              <Text>{t("Change language")}</Text>
            </Box>
          )}
        </Pressable>
        <Pressable className="w-full">
          {({ pressed }) => (
            <Box
              className={`${pressed && "bg-error-50"} w-full flex-row items-center gap-4 rounded-md px-4 py-5`}
            >
              <AntDesign name="logout" size={24} color="#e63535" />
              <Text className="text-error-500">{t("Log out")}</Text>
            </Box>
          )}
        </Pressable>
        <LanguageActionsheet
          showActionsheet={showActionsheet}
          handleClose={handleClose}
        />
      </Box>
    </SafeAreaView>
  );
}
