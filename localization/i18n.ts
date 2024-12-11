import i18n, { ModuleType, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, pl } from './translations';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin: {
	type: ModuleType;
	async: boolean;
	init: () => void;
	detect: (callback: (lang: string) => void) => Promise<void>;
	cacheUserLanguage: (language: string) => Promise<void>;
} = {
	type: 'languageDetector',
	async: true,
	init: () => {},
	detect: async (callback: (lang: string) => void) => {
		try {
			const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
			callback(language || 'en');
		} catch (error) {
			console.log('Error reading language', error);
			callback('en');
		}
	},
	cacheUserLanguage: async (language: string) => {
		try {
			await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
		} catch (error) {
			console.log('Error saving language', error);
		}
	},
};

const resources: Resource = {
	en: {
		translation: en,
	},
	pl: {
		translation: pl,
	},
};

i18n
	.use(initReactI18next)
	.use(languageDetectorPlugin)
	.init({
		resources,
		fallbackLng: 'en',
		defaultNS: 'translation',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
