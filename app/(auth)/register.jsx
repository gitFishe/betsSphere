import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Button, ScrollView, Animated} from 'react-native';
import { router } from 'expo-router';
import {LinearGradient} from "expo-linear-gradient";
import FormField from "../../components/FormField";
import authServices from "../../lib/authServices";
import {useGlobalContext} from "../../context/GlobalProvider";
import { Modal } from 'react-native';
import icons from "../../constants/icons";

const login = () => {

    const { setUser } = useGlobalContext();
    const [isSlided, setIsSlided] = useState(false);
    const [isButtonAnimating, setIsButtonAnimating] = useState(false);

    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',
    })



    const handleMouseEnter = () => {
        if (isButtonAnimating) return;
        setIsButtonAnimating(true);

        const duration = 1000;

        setTimeout(() => {
            setIsButtonAnimating(false);
        }, duration);
    };

    const submit = async () => {
        console.log(form);
        try {
            const res = await authServices.register(form);

            setUser(res);
            router.replace('/home');
        } catch (error) {
            console.log('Ошибка регистрации:', error);
        }
    };


    const translateY1 = new Animated.Value(0); // Первый блок
    const translateY2 = new Animated.Value(-105); // Второй блок

    const toggleSlide = () => {
        Animated.timing(translateY1, {
            toValue: isSlided ? 0 : -105, // 0 - исходная позиция, -105 - поднятие вверх
            duration: 500,
            useNativeDriver: true,
        }).start();

        Animated.timing(translateY2, {
            toValue: isSlided ? -105 : 0, // Также управляем вторым блоком
            duration: 500,
            useNativeDriver: true,
        }).start();

        setIsSlided(!isSlided);
    };





    return (
        <View className="flex-1 justify-center items-center bg-gradient-background relative">

            <TouchableOpacity
                className='absolute left-[50px] top-[50px]'
                onPress={() => router.push(`/home`)}>
                <Image
                    className='!w-[260px] !h-[50px]'
                    source={require('../../images/logo-white.png')}/>
            </TouchableOpacity>

            <LinearGradient
                colors={[
                    'rgba(120, 160, 200, 0.45)',
                    'rgba(70, 100, 130, 0.3)',
                    'rgba(40, 60, 80, 0.2)',
                    'rgba(20, 25, 30, 1)',
                ]}
                locations={[0, 0.25, 0.47, 0.8]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                className='!w-[700px] overflow-hidden !h-[700px] px-[60px] py-[50px]
                    shadow-[inset_0px_0px_8px_0px_rgba(198,198,198,0.1)]
                    rounded-[50px] border-[#252e35] backdrop-blur-[20px]
                    bg-gradient-to-[215deg] from-[rgba(120,160,200,0.45)] via-[rgba(70,100,130,0.3)] to-[rgba(20,25,30,1)]
                    border-2'>


                <View className='relative overflow-hidden w-full h-full rounded-xl'>
                    <Animated.View
                        style={{
                            transform: [{ translateY: translateY1 }]
                        }}
                        className={`absolute left-0 top-0 w-full !h-full ${isSlided ? 'animate-register-scroll-animation' : ''}`}>
                        <Text className='mb-[40px] text-[50px] font-bold text-[#e9f1f4]'>
                            Register
                        </Text>

                        <FormField
                            handleChangeText={(e) => setForm({...form, email: e})}
                            value={form.email}
                            title='Email'/>
                        <FormField
                            handleChangeText={(e) => setForm({...form, username: e})}
                            value={form.username}
                            title='Username'/>
                        <FormField
                            handleChangeText={(e) => setForm({...form, password: e})}
                            value={form.password}
                            title='Password'/>

                        <TouchableOpacity className='mb-5 w-fit'
                                          onPress={toggleSlide} >
                            <Text className='underline color-[#a1abb8] text-xl'>Terms & Conditions</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={submit}
                            onMouseEnter={handleMouseEnter}
                            className='w-full !h-[60px] border border-[#314147] rounded-[10px] bg-[rgba(36,48,60,0.5)] overflow-hidden justify-center items-center relative'>

                            <Text className='color-[#a1abb8] text-xl font-bold'>Confirm</Text>

                            <View
                                className={`absolute ${isButtonAnimating ? 'animate-login-button-animation' : ''} left-[-150%] w-[150%] 
                        top-0 h-full bg-gradient-to-r from-transparent to-transparent 
                        via-white/[0.3] transform`}
                            />

                        </TouchableOpacity>


                        <TouchableOpacity
                            className='mt-auto mx-auto'
                            onPress={() => router.push('/login')}>
                            <Text className="text-[#e9f1f4] text-xl underline">Already have an account?</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        style={{
                            transform: [{ translateY: translateY2 }]
                        }}
                        className={`absolute left-0 top-0 w-full !h-full ${isSlided ? 'animate-register-scroll-animation-reverse' : 'animate-register-scroll-animation'}`}>
                        <TouchableOpacity className='absolute w-auto h-auto p-3 left-1/2 top-0 -translate-x-1/2 z-10'>
                            <Image
                                resizeMode='contain'
                                className='!w-[30px] !h-[40px]'
                                onPress={() => setIsSlided(false)}
                                source={icons.arrowUp}/>
                        </TouchableOpacity>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            className='w-full h-full'>
                            <View className="rounded-xl p-4 shadow-lg relative">
                                <Text className="text-xl font-bold text-white">Terms and Conditions</Text>

                                <Text className="mt-4 text-base color-[#a1abb8]">
                                    Violation of these rules may result in immediate account termination and legal action.
                                </Text>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        9. Termination
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We may terminate or suspend your account and access to our services at any time, without prior notice or liability, for any reason whatsoever. Reasons for termination may include, but are not limited to, breach of Terms, suspicious activity, or inappropriate behavior.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Upon termination, your right to use the platform will immediately cease, and we reserve the right to delete any associated information, content, and balances without refund.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        10. No Warranty
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        BetSphere provides the services "as is" and "as available" without any warranties of any kind, whether express or implied.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We do not guarantee that:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        • The service will be uninterrupted, secure, or error-free.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        • Results obtained from the use of the service will be accurate or reliable.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        • The quality of any products, services, information, or other material obtained by you through the service will meet your expectations.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        11. Limitation of Liability
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        To the fullest extent permitted by law, BetSphere shall not be liable...
                                    </Text>
                                </View>

                                {/* Другие разделы остаются аналогично */}
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>

            </LinearGradient>
        </View>
    );
};

export default login;




{/*<View*/}
{/*    style={{*/}
{/*        background: 'linear-gradient(45deg, #1d2629, #6c8196)',*/}
{/*        maskImage: 'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',*/}
{/*        WebkitMaskImage: 'linear-gradient(#000 0 0), linear-gradient(#000 0 0)',*/}
{/*        maskComposite: 'exclude',*/}
{/*        WebkitMaskComposite: 'xor',*/}
{/*        maskRepeat: 'no-repeat',*/}
{/*        maskSize: 'cover',*/}
{/*    }}*/}
{/*    className='absolute inset-0 p-[1px] left-0 top-0 !w-full !h-full rounded-[50px] bg-red-500 gradient-border-mask'/>*/}
