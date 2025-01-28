import ActiveGoalsCard from "@/components/dashboard/active-goals-card";
import ExpensesByCategoryCard from "@/components/dashboard/expenses-by-category-card";
import ExpensesChart from "@/components/dashboard/expenses-chart";
import TotalCurrentExpensesCard from "@/components/dashboard/total-current-expenses-card";
import UpcomingExpensesCard from "@/components/dashboard/upcoming-expenses-card";
import { VStack } from "@/components/ui/vstack";
import {
  getCurrentMonthExpenses,
  getExpensesFromLastTwelveMonths,
  getPrevMonthExpenses,
  getUpcomingExpenses,
} from "@/lib/api/expenses";
import { getAllGoals } from "@/lib/api/goals";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

export default function DashboardPage() {
  const totalCurrentMonthExpenses = useQuery({
    queryKey: ["getTotalCurrentMonthExpenses"],
    queryFn: getCurrentMonthExpenses,
  });

  const totalPrevMonthExpenses = useQuery({
    queryKey: ["getTotalPrevMonthExpenses"],
    queryFn: getPrevMonthExpenses,
  });

  const lastTwelveMonthsExpenses = useQuery({
    queryKey: ["lastTwelveExpenses"],
    queryFn: getExpensesFromLastTwelveMonths,
  });

  const goals = useQuery({
    queryKey: ["goals"],
    queryFn: getAllGoals,
  });

  const upcomingExpenses = useQuery({
    queryKey: ["upcomingExpenses"],
    queryFn: getUpcomingExpenses,
  });

  const handleRefetchQueries = () => {
    totalCurrentMonthExpenses.refetch();
    totalPrevMonthExpenses.refetch();
    lastTwelveMonthsExpenses.refetch();
    goals.refetch();
    upcomingExpenses.refetch();
  };

  const isRefreshing =
    totalCurrentMonthExpenses.isLoading ||
    totalPrevMonthExpenses.isLoading ||
    lastTwelveMonthsExpenses.isLoading ||
    goals.isLoading ||
    upcomingExpenses.isLoading;

  return (
    <SafeAreaView className="h-full bg-background-0">
      <ScrollView
        className="px-3 py-2"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefetchQueries}
          />
        }
      >
        <VStack space="md" className="h-full pb-[60px]">
          <VStack space="md">
            <TotalCurrentExpensesCard
              totalCurrentMonthExpenses={totalCurrentMonthExpenses}
              totalPrevMonthExpenses={totalPrevMonthExpenses}
            />
            <ActiveGoalsCard goals={goals} />
            <UpcomingExpensesCard upcomingExpenses={upcomingExpenses} />
          </VStack>
          <ExpensesChart lastTwelveMonthsExpenses={lastTwelveMonthsExpenses} />
          <ExpensesByCategoryCard />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
