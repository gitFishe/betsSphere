import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';

const Bet = ({ title }) => {
    return (
        <TouchableOpacity className='bg-[#1F2229] !h-[210px] w-full mb-[30px] rounded-[33px] border border-[#1E1F23] py-[34px] px-[38px]'>
            <View>
                <Text className="font-bold text-4xl text-[#E7E7E7] mb-[26px]">{title}</Text>
                <View className='!w-[173] !h-[23] bg-[#22262D] rounded-full mb-[17px]'/>
                <View className='!w-[243] !h-[23] bg-[#22262D] rounded-full'/>
            </View>
        </TouchableOpacity>
    );
};

export default function TrendingBets({ styles }) {
    const data = [
        { id: '1', title: 'Trump vs Aliens 2025' },
        { id: '2', title: 'Cats vs Dogs' },
        { id: '3', title: 'Elon vs Zuckerberg' },
        { id: '4', title: 'Elon vs Zuckerberg' },
    ];

    return (
        <View className={`defaultCompStyle px-[45px] pt-[40px] ${styles}`}>
            <Text className='mb-[37px] font-bold text-[#E7E7E7] text-[50px] leading-[55px]'>
                Place Your Bets
            </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Bet title={item.title} />}
            />
        </View>
    );
}
