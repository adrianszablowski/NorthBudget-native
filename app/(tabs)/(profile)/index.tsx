import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
	const { t, i18n } = useTranslation();

	return (
		<SafeAreaView className='flex justify-center items-center h-screen'>
			<Text>{t('Profile')}</Text>
			<TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
				<Text>Zmien jezyk</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
