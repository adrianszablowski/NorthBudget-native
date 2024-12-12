/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['RobotoRegular', 'System'],
				'roboto-thin': ['RobotoThin', 'System'],
				'roboto-thin-italic': ['RobotoThinItalic', 'System'],
				'roboto-medium-italic': ['RobotoMediumItalic', 'System'],
				'roboto-light': ['RobotoLight', 'System'],
				'roboto-light-italic': ['RobotoLightItalic', 'System'],
				'roboto-italic': ['RobotoItalic', 'System'],
				'roboto-bold': ['RobotoBold', 'System'],
				'roboto-bold-italic': ['RobotoBoldItalic', 'System'],
				'roboto-black': ['RobotoBlack', 'System'],
				'roboto-black-italic': ['RobotoBlackItalic', 'System'],
			},
		},
	},
	plugins: [],
};
