import { HapticTab } from '@/components/ui/HapticTab';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#968',
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: Platform.select({ ios: { position: 'absolute' }, default: {} }),
			}}>
			<Tabs.Screen name='index' options={{ title: 'Dashboard' }} />
			<Tabs.Screen name='expenses' options={{ title: 'Expenses' }} />
		</Tabs>
	);
}
