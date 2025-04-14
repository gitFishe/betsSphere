import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({onPress, title, containerStyles, textStyles, isLoading, containerColor}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			className={`bg-primary rounded-[20px] overflow-hidden border-2  !h-[64px] ${containerStyles} 
			${isLoading ? 'opacity-50' : ''}`}
			disabled={isLoading}>
			<LinearGradient
				colors={containerColor}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
				className='bg-primary px-[27px] !h-[64px] justify-center items-center'>
					<Text className={`font-psemibold text-2xl font-bold ${textStyles}`}>
						{title}
					</Text>
			</LinearGradient>
		</TouchableOpacity>

	);
};

export default CustomButton;
