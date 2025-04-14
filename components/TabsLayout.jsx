import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";

const TABS = [
	{ id: "home", label: "🏠 Home" },
	{ id: "list", label: "📋 List" },
	{ id: "history", label: "📜 History" },
	{ id: "settings", label: "⚙ Settings" },
];

const TabsLayout = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<View className="flex-row bg-gray-800 h-full">
			<View className="w-24 h-full bg-gray-900 p-4">
				{TABS.map((tab) => (
					<TouchableOpacity
						key={tab.id}
						onPress={() => router.push(`/${tab.id}`)}
						className={`p-3 my-2 rounded-lg ${
							pathname === `/${tab.id}` ? "bg-orange-500" : "bg-gray-700"
						}`}
					>
						<Text className="text-white text-xs text-center">{tab.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default TabsLayout;
