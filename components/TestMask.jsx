import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

export default function SkeletonAnimation ({bars = []}) {
	const animation = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.timing(animation, {
				toValue: 1,
				duration: 1500,
				useNativeDriver: false,
			})
		).start();
	}, []);

	const translateX = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [-100, 1000],
	});

	const renderBar = (styles) => (
		<View
			className={`${styles} bg-[#22262d] relative overflow-hidden`}
			style={{ overflow: 'hidden' }}
		>
			<Animated.View
				style={{
					position: 'absolute',
					width: 100,
					height: '100%',
					transform: [{ translateX }],
				}}
			>
				<LinearGradient
					colors={[
						'transparent',
						'rgba(255, 255, 255, 0.3)',
						'transparent',
					]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{ flex: 1 }}
				/>

			</Animated.View>
		</View>
	);

	return (
		<View >
			{bars.map((bar, index) => renderBar(bar.styles, index))}
		</View>
	);
};
