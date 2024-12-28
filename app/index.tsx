import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function Index() {
  const { push } = useRouter();

  return (
    <SafeAreaView className="h-screen bg-primary-600">
      <VStack space="lg" className="h-full items-center justify-center px-3">
        <Heading size="3xl" className="text-typography-0">
          Welcome to NorthBudget
        </Heading>
        <Text className="text-center text-typography-0">
          Your personal finance companion for tracking expenses, saving money,
          and achieving your financial goals.
        </Text>
        <HStack className="items-center">
          <Text className="text-typography-0">Already have an account? </Text>
          <Button onPress={() => push("/login")} variant="link">
            <ButtonText className="uppercase text-typography-0">
              log in
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
}
