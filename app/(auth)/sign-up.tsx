import SignUpForm from "@/components/auth/sign-up-form";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { SafeAreaView } from "react-native";

export default function SignUpPage() {
  return (
    <SafeAreaView className="h-full bg-background-0">
      <VStack className="h-full items-center justify-center px-3 pb-10">
        <Image
          source={require("../../assets/images/logo-blue.png")}
          size="lg"
          className="mb-5 rounded-2xl"
          alt="northbudget logo"
        />
        <SignUpForm />
      </VStack>
    </SafeAreaView>
  );
}
