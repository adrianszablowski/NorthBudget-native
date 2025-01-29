import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useUserContext from "@/hooks/user-user-context";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Redirect, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native";
import "react-native-url-polyfill/auto";

export default function Index() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { user } = useUserContext();

  if (user) return <Redirect href="/dashboard" />;

  return (
    <SafeAreaView className="h-screen bg-background-0">
      <VStack space="xl" className="h-full items-center justify-center px-3">
        <Image
          source={require("/assets/images/logo-blue.png")}
          size="lg"
          className="mb-5 rounded-2xl"
          alt="northbudget logo"
        />
        <Heading size="3xl" className="text-primary-600">
          {t("Welcome to")} NorthBudget
        </Heading>
        <Text className="text-center text-primary-600">
          {t("Manage your finances with ease")}
        </Text>
        <VStack space="md" className="w-96">
          <Button isDisabled>
            <FontAwesome name="google" size={18} color="white" />
            <ButtonText>{t("Continue with")} Google</ButtonText>
          </Button>
          <Button isDisabled>
            <FontAwesome name="facebook" size={18} color="white" />
            <ButtonText>{t("Continue with")} Facebook</ButtonText>
          </Button>
          <Button isDisabled>
            <FontAwesome name="apple" size={18} color="white" />
            <ButtonText>{t("Continue with")} Apple</ButtonText>
          </Button>
          <Divider className="my-2 bg-primary-600" />
          <Button onPress={() => push("/sign-up")}>
            <FontAwesome name="envelope" size={18} color="white" />
            <ButtonText>{t("Sign up with email")}</ButtonText>
          </Button>
        </VStack>
        <HStack className="items-center">
          <Text className="text-primary-600">
            {t("Already have an account")}?{" "}
          </Text>
          <Link
            href="/(auth)/sign-in"
            className="pr-2 font-bold uppercase text-primary-600"
          >
            {t("Sign in")}
          </Link>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
}
