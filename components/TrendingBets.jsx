import React, {useState} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';

const Bet = ({ title, isLoaded }) => {
    return (
        <TouchableOpacity className='bg-[#1F2229] shadow-custom-shadow !h-[210px] w-full mb-[30px] rounded-[33px] border border-[#1E1F23] py-[34px] px-[38px]'>
            {
                !isLoaded ? (
                    <View>
                        <Text className="!w-[300px] !h-[30px] rounded-full bg-[#22262D] mb-[26px]"></Text>
                        <View className='w-full !h-[23px] bg-[#22262D] rounded-full mb-[17px]'/>
                        <View className='!w-[600px] !h-[23px] bg-[#22262D] rounded-full'/>
                    </View>
                ) : (
                    <View>
                        <Text className="font-bold text-4xl text-[#E7E7E7] mb-[26px]">{title}</Text>
                        <View className='!w-[173px] !h-[23px] bg-[#22262D] rounded-full mb-[17px]'/>
                        <View className='!w-[243px] !h-[23px] bg-[#22262D] rounded-full'/>
                    </View>
                )
            }
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

    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <View className={`defaultCompStyle px-[45px] pt-[40px] ${styles}`}>
            <Text className='mb-[37px] font-bold text-[#E7E7E7] text-[50px] leading-[55px]'>
                Place Your Bets
            </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Bet title={item.title} isLoaded={isLoaded}/>}
            />
        </View>
    );
}
