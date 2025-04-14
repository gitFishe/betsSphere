import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = ({ isLoading, search, containerStyles, handlePress, containerColor }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.5}
			disabled={isLoading}
			className={`rounded-[30px] border-gray border-[2px] !w-[325px] !h-[81px] justify-center drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${containerStyles} overflow-hidden`}
		>
			<LinearGradient
				colors={containerColor}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				className="flex-1 justify-center px-[30px] "
			>
				<View className="bg-[#1f2329] !w-[200px] !h-[23px] rounded-full" />
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default SearchBar;
