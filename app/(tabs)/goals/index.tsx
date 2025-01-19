import GoalCard from "@/components/goals/goal-card";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { AddIcon, Icon, LoaderIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { getAllGoals } from "@/lib/api/goals";
import { Goal } from "@/types/types";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import React from "react";
import { useTranslation } from "react-i18next";
import { Else, If, Then } from "react-if";
import { SafeAreaView, ScrollView } from "react-native";
import colors from "tailwindcss/colors";

export default function Goals() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { data: goalsData, isLoading: goalsDataIsLoading } = useQuery({
    queryKey: ["getGoals"],
    queryFn: getAllGoals,
  });

  if (goalsDataIsLoading) {
    return (
      <SafeAreaView className="h-full bg-background-0">
        <Center className="h-full pb-[60px]">
          <Icon as={LoaderIcon} color={colors.blue[600]} />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-background-0">
      <If condition={!isEmpty(goalsData)}>
        <Then>
          <ScrollView className="px-3 py-2">
            <VStack space="sm" className="h-full pb-[60px]">
              <Button onPress={() => push("/goals/create")}>
                <ButtonIcon as={AddIcon} />
                <ButtonText>{t("Create new goal")}</ButtonText>
              </Button>
              <VStack space="md">
                {map(goalsData, (goal: Goal) => (
                  <GoalCard key={goal.$id} goal={goal} />
                ))}
              </VStack>
            </VStack>
          </ScrollView>
        </Then>
        <Else>
          <Center className="h-full pb-[60px]">
            <VStack space="md" className="items-center">
              <FontAwesome name="inbox" size={50} color={colors.neutral[300]} />
              <Text size="sm" className="px-20 text-center text-typography-400">
                {t("Empty goals")}
              </Text>
              <Button onPress={() => push("/goals/create")}>
                <ButtonIcon as={AddIcon} />
                <ButtonText>{t("Create new goal")}</ButtonText>
              </Button>
            </VStack>
          </Center>
        </Else>
      </If>
    </SafeAreaView>
  );
}
