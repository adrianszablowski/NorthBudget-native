import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-0">
      <Link href="/">
        <Text>Go to home screen!</Text>
      </Link>
    </SafeAreaView>
  );
}
