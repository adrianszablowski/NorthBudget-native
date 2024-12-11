import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	const { t } = useTranslation();

	return (
		<SafeAreaView className='flex justify-center items-center h-screen'>
			<Text>{t('Dashboard')}</Text>
		</SafeAreaView>
	);
}
