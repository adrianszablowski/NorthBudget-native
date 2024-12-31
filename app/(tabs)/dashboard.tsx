import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-0">
      <Text>{t("Dashboard")}</Text>
    </SafeAreaView>
  );
}
