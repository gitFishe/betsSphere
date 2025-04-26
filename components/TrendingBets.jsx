import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import TestMask from "./TestMask";
import TestAnimation from "./TestMask";
import SkeletonAnimation from "./TestMask";

const Bet = ({ title, isLoaded }) => {
    return (
        <TouchableOpacity className='bg-[#1F2229] shadow-custom-shadow !h-[210px] w-full mb-[30px] rounded-[33px] border border-[#1E1F23] py-[34px] px-[38px]'>
            {
                !isLoaded ? (
                    <View>
                        {/*<View className="!w-[300px] !h-[40px] rounded-[18px] bg-[#22262D] mb-[26px] relative overflow-hidden">*/}
                        {/*    <View*/}
                        {/*        className={`absolute animate-login-button-animation left-[-150%] w-[150%]*/}
                        {/*    top-0 h-full bg-gradient-to-r from-transparent to-transparent */}
                        {/*    via-white/[0.3] transform`}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        {/*<View className='w-full !h-[23px] bg-[#22262D] rounded-xl mb-[17px] relative overflow-hidden'>*/}
                        {/*    <View*/}
                        {/*        className={`absolute animate-login-button-animation left-[-150%] w-[150%]*/}
                        {/*    top-0 h-full bg-gradient-to-r from-transparent to-transparent */}
                        {/*    via-white/[0.3] transform`}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        {/*<View className='!w-[600px] !h-[23px] bg-[#22262D] rounded-xl relative overflow-hidden'>*/}
                        {/*    <View*/}
                        {/*        className={`absolute animate-login-button-animation left-[-150%] w-[150%]*/}
                        {/*    top-0 h-full bg-gradient-to-r from-transparent to-transparent */}
                        {/*    via-white/[0.3] transform`}*/}
                        {/*    />*/}
                        {/*</View>*/}
                        <SkeletonAnimation bars={[
                            { styles: 'mb-[26px] !h-[40px] !w-[300px] rounded-[18px]'},
                            { styles: 'mb-[17px] !h-[23px] !w-full rounded-xl'},
                            { styles: '!w-[600px] !h-[23px] rounded-xl'},
                        ]} />
                    </View>

                ) : (
                    <View>
                        <Text className="font-bold text-4xl text-[#E7E7E7] mb-[26px]">{title}</Text>
                        <View className='!w-full !h-[23px] bg-[#22262D] rounded-xl mb-[17px]'/>
                        <View className='!w-[600px] !h-[23px] bg-[#22262D] rounded-xl'/>
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
        { id: '5', title: 'Nigga vs Nigga' },
    ];

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 3000);
    }, []);

    return (
        <View className={`defaultCompStyle px-[45px] pt-[40px] ${styles}`}>
            <Text className='mb-[37px] font-bold text-[#E7E7E7] text-[50px] leading-[55px]'>
                Place Your Bets
            </Text>
            <TestAnimation></TestAnimation>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Bet title={item.title} isLoaded={isLoaded}/>}
            />
        </View>
    );
}
