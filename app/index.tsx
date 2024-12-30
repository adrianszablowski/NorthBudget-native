import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function Index() {
  const { push } = useRouter();

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <VStack space="xl" className="h-full items-center justify-center px-3">
        <Image
          source={require("/assets/images/logo-blue.png")}
          size="lg"
          className="mb-5 rounded-2xl"
        />
        <Heading size="3xl" className="text-primary-600">
          Welcome to NorthBudget
        </Heading>
        <Text className="text-center text-primary-600">
          Your personal finance companion for tracking expenses, saving money,
          and achieving your financial goals.
        </Text>
        <VStack space="md" className="w-96">
          <Button>
            <FontAwesome name="google" size={18} color="white" />
            <ButtonText>Continue with Google</ButtonText>
          </Button>
          <Button>
            <FontAwesome name="facebook" size={18} color="white" />
            <ButtonText>Continue with Facebook</ButtonText>
          </Button>
          <Button>
            <FontAwesome name="apple" size={18} color="white" />
            <ButtonText>Continue with Apple</ButtonText>
          </Button>
          <Divider className="my-2 bg-primary-600" />
          <Button>
            <FontAwesome name="envelope" size={18} color="white" />
            <ButtonText>Sign Up with Email</ButtonText>
          </Button>
        </VStack>
        <HStack className="items-center">
          <Text className="text-primary-600">Already have an account? </Text>
          <Button onPress={() => push("/login")} variant="link">
            <ButtonText className="uppercase text-primary-600">
              log in
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
}
