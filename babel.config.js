module.exports = function (api) {
	api.cache(true);

	return {
		presets: [
			['babel-preset-expo', { jsxImportSource: 'nativewind' }],
			'nativewind/babel',
		],
		plugins: [
			// Плагин Reanimated должен быть последним
			'react-native-reanimated/plugin',
		],
	};
};