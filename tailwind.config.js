/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		boxShadow: {
			'custom-shadow': '0px 4px 4px 0px rgba(0,0,0,0.25)',
		},
		extend: {
			animation: {
				'login-button-animation': 'slide-in 1s ease-in-out forwards',
			},
			keyframes: {
				'slide-in': {
					'0%': {
						transform: 'translateX(-10%)',
					},
					'100%': {
						transform: 'translateX(200%)',
					},
				},
			},
			backgroundImage: {
				'gradient-custom': 'linear-gradient(148.36deg, #24242C 0.32%, #1D1E23 52.88%)',
				'gradient-background' : 'radial-gradient(circle at 80% -50%, rgba(43,60,76,1) 0%, rgb(15, 20, 26) 80%)',
				'gradient-block' : 'linear-gradient(215deg, rgba(120, 160, 200, 0.45) 0%, rgba(70, 100, 130, 0.3) 25%, rgba(40, 60, 80, 0.2) 47%, rgba(20, 25, 30, 1) 80%)',

			},
			colors: {
				elem:'#1c1d22',
				primary: {
					DEFAULT: "#1B1C20",
					light: "#1B1C21",
					dark: "#15161A",
				},
				gray: {
					DEFAULT: '#1F2023',
					light: "#414149",
				},
				background:"#20232A",
				text:"#9898A0",
			},
			fontFamily: {
				geologica: ['Geologica', 'sans-serif'],
					'geologica-bold': ['Geologica-Bold', 'sans-serif'],
					'geologica-light': ['Geologica-Light', 'sans-serif'],
				pthin: ['Poppins-Thin', 'sans-serif'],
				pextralight: ["Poppins-ExtraLight", "sans-serif"],
				plight: ["Poppins-Light", "sans-serif"],
				pregular: ["Poppins-Regular", "sans-serif"],
				pmedium: ["Poppins-Medium", "sans-serif"],
				psemibold: ["Poppins-SemiBold", "sans-serif"],
				pbold: ["Poppins-Bold", "sans-serif"],
				pextrabold: ["Poppins-ExtraBold", "sans-serif"],
				pblack: ["Poppins-Black", "sans-serif"],
			},
		},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.defaultCompStyle': {
					backgroundColor: "#1c1d22",
					borderRadius: '30px',
					borderWidth: '2px',
					borderColor: '#1c1d22', // Твоя переменная gray-400 например
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				},
			});
		},
	],
	presets: [require("nativewind/preset")],
};