import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex h-screen items-center justify-center">
      <Link href="/">
        <Text>Go to home screen!</Text>
      </Link>
    </SafeAreaView>
  );
}
