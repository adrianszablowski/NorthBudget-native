import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-0">
      <Text>{t("Dashboard")}</Text>
      <Button onPress={() => push("/login")}>
        <ButtonText>Login page</ButtonText>
      </Button>
      <Button onPress={() => push("/")}>
        <ButtonText>index</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
