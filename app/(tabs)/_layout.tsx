import { HapticTab } from '@/components/ui/HapticTab';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

export default function TabLayout() {
	const { t } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#968',
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: Platform.select({ ios: { position: 'absolute' }, default: {} }),
			}}>
			<Tabs.Screen name='index' options={{ title: t('Dashboard') }} />
			<Tabs.Screen name='expenses' options={{ title: t('Expenses') }} />
			<Tabs.Screen name='(profile)' options={{ title: t('Profile') }} />
		</Tabs>
	);
}
