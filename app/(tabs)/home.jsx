import { View, Text } from "react-native";
import LiveChat from "../../components/LiveChat";
import React from "react";


export default function home() {
	return (
		<View className="flex-1 flex-row pt-12">
			<View className='rounded-[30px] border-gray border-[2px] !h-full px-[45px] py-[40px] !shrink mr-10 w-full'>
				<View className='bg-[#1c1d22]'>

				</View>
			</View>
			<View className='!w-[450px] shrink-0'>
				<View></View>
				<LiveChat/>
			</View>
		</View>
	);
}
