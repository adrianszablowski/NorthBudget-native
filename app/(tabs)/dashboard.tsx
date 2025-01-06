import ActiveGoalsCard from "@/components/dashboard/active-goals-card";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import TotalCurrentExpensesCard from "@/components/dashboard/total-current-expenses-card";
import UpcomingExpensesCard from "@/components/dashboard/upcoming-expenses-card";
import { VStack } from "@/components/ui/vstack";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView } from "react-native";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="h-full bg-background-0">
      <ScrollView className="px-3 py-2">
        <VStack space="md" className="h-full pb-[60px]">
          <VStack space="md">
            <TotalCurrentExpensesCard />
            <ActiveGoalsCard />
            <UpcomingExpensesCard />
          </VStack>
          <ExpensesChart />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
