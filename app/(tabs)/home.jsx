import {View, Text, TouchableOpacity} from "react-native";
import LiveChat from "../../components/LiveChat";
import React from "react";
import TrendingBets from "../../components/TrendingBets";

export default function home() {

	let text = 'Who is the most nigga?'

	return (
		<View className="flex-1 flex-row pt-12">
			<TrendingBets
				styles='!h-full !shrink mr-10 w-full'
			/>
			<View className='!w-[442px] shrink-0'>

				<View className='defaultCompStyle !h-[85px] px-[30px] justify-center mb-5'>
					<Text className='text-[#E7E7E7] text-[30px] leading-9 truncate font-bold'>Trending: {text}</Text>
				</View>

				<View className='defaultCompStyle mb-5 !h-full !shrink'>

				</View>

				<LiveChat/>
			</View>
		</View>
	);
}
