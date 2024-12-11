import { Stack } from 'expo-router';
import '@/localization/i18n';

import '../global.css';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
	return (
		<>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' options={{ headerShown: false }} />
			</Stack>
			<StatusBar style='auto' />
		</>
	);
}
