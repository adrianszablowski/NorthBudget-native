import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
	return (
		<SafeAreaView className='flex justify-center items-center h-screen'>
			<Link href='/'>
				<Text>Go to home screen!</Text>
			</Link>
		</SafeAreaView>
	);
}
