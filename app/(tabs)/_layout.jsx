import React, {useState} from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, Slot, usePathname } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';


import SearchBar from "../../components/SearchBar";
import CustomButton from "../../components/CustomButton";
import LiveChat from "../../components/LiveChat";
import {useGlobalContext} from "../../context/GlobalProvider";

const TABS = [
	{ id: "home", img: "home",label: "🏠 Home" },
	{ id: "list", img: "list", label: "📋 List" },
	{ id: "history", img: "history", label: "📜 History" },
	{ id: "settings", img: "settings", label: "⚙ Settings" },
];

const TabsLayout = () => {
	const router = useRouter();
	const pathname = usePathname();

	const { isLoggedIn } = useGlobalContext();


	return (
		<LinearGradient
			colors={['#24242C', '#1D1E23']}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0, y: 1 }}
			className="h-full items-center"
		>
			{/*!max-w-[2000px]*/}
			<View className="flex-1 flex-row !w-[95%]">
				<View className='pt-4 pl-4 pb-4'>
					<View className="!w-378 h-full py-[55px] pl-12 pr-7
					rounded-l-[50px] border-t-[2px] border-l-[2px]
					border-t-gray-light border-l-gray-light
					shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
					bg-primary
					">
						<Image
							className='!w-[260px] !h-[50px] mb-20'
							source={require('../../images/logo.png')}/>
						{TABS.map((tab) => (
							<TouchableOpacity
								key={tab.id}
								disabled={pathname === `/${tab.id}`}
								onPress={() => router.push(`/${tab.id}`)}
								className={`px-9 rounded-[20px] my-2 !h-[85px] justify-center font-geologica ${
									pathname === `/${tab.id}` ? "bg-[#1f2229] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" : "bg-primary"
								}`}
							>
								<Text className="text-[#9898A0] text-3xl font-bold">
									{/*<Image*/}
									{/*	className='!w-[28px] !h-[28px] mr-[24px]'*/}
									{/*	source={require(`../../images/navigate-${tab.img}.svg`)}/>*/}
									{tab.label}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View className="flex-1 my-4 px-12 pt-10 pb-4 z-10 rounded-r-[30px] border-t-[2px] border-gray-light bg-primary-dark shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]">

					<View className='mb-5'>
						<View className='flex-1 flex-row justify-center items-center'>
							<SearchBar
								onPress={() => {alert(innerWidth)}}
								containerColor={['#1F2025', '#1C1D21']}
								containerStyles='mr-auto'/>

							<CustomButton
								onPress={() => {alert(innerWidth); alert(innerHeight)}}
								textStyles='text-gray-200'
								containerColor={['#1F2025', '#1C1D21']}
								title='Log In'
								containerStyles='border-gray mr-[12px]'/>
							{isLoggedIn ? (
								<View className='bg-gray-400 !w-10 !h-10 '>

								</View>
							) : (
								<>
									<CustomButton
									onPress={() => {router.push('/login')}}
									textStyles='text-gray-200'
									containerColor={['#1F2025', '#1C1D21']}
									title='Log In'
									containerStyles='border-gray mr-[12px]'/>

									<CustomButton
										onPress={() => {router.push('/register')}}
										textStyles='text-[#F4FDFA]'
										containerColor={['#6466A9', '#4F4C82']}
										title='Sign Up'
										containerStyles='border-[#43436B]'/>
								</>
							)}
						</View>
					</View>
				<Slot/>
				</View>
			</View>
		</LinearGradient>
	);
};

export default TabsLayout;
