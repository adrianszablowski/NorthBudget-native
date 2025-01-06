import ActiveGoalsCard from "@/components/dashboard/active-goals-card";
import ExpensesByCategoryCard from "@/components/dashboard/expenses-by-category-card";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import TotalCurrentExpensesCard from "@/components/dashboard/total-current-expenses-card";
import UpcomingExpensesCard from "@/components/dashboard/upcoming-expenses-card";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView, ScrollView } from "react-native";

export default function DashboardPage() {
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
          <ExpensesByCategoryCard />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
