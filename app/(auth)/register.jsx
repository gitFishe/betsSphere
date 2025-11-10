import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Button, ScrollView, Animated} from 'react-native';
import { router } from 'expo-router';
import {LinearGradient} from "expo-linear-gradient";
import FormField from "../../components/FormField";
import authServices from "../../lib/authServices";
import {useGlobalContext} from "../../context/GlobalProvider";
import icons from "../../constants/icons";
import {MotiView} from "moti";


import horse from "../../assets/images/horse-vid.mp4";
import {Video} from "expo-av";

const login = () => {

    const { setUser } = useGlobalContext();
    const [isSlided, setIsSlided] = useState(false);
    const [isButtonAnimating, setIsButtonAnimating] = useState(false);
    const [isChecked, setIsChecked] = useState()

    const handleMouseEnter = () => {
        if (isButtonAnimating) return;
        setIsButtonAnimating(true);

        const duration = 1000;

        setTimeout(() => {
            setIsButtonAnimating(false);
        }, duration);
    };

    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',
    })

    const [errors, setErrors] = useState({
        email: false,
        username: false,
        password: false,
        checkbox: false,
    });

    const validateForm = () => {
        const newErrors = {
            email: form.email.trim() === '',
            username: form.username.trim() === '',
            password: form.password.trim() === '',
            checkbox: !isChecked
        }
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const submit = async () => {
        
        console.log(form);
        try {
            if(!validateForm()) {return}
            const res = await authServices.register(form);

            setUser(res);
            router.replace('/home');
        } catch (error) {
            console.log('Ошибка регистрации:', error);
        }
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
                    <MotiView
                        from={{
                            translateY: 0,
                        }}
                        animate={{
                            translateY: isSlided ? -596 : 0,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 500,
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        className={`absolute left-0 top-0 w-full h-full`}>

                        <Text className='mb-[40px] text-[50px] font-bold text-[#e9f1f4]'>
                            Register
                        </Text>

                        <FormField
                            error={errors.email}
                            handleChangeText={(e) => {
                                setForm(prev => ({ ...prev, email: e }));
                                setErrors(prev => ({ ...prev, email: false }));
                            }}
                            value={form.email}
                            title='Email'/>
                        <FormField
                            error={errors.username}
                            handleChangeText={(e) => {
                                setForm(prev => ({ ...prev, username: e }));
                                setErrors(prev => ({ ...prev, username: false }));
                            }}
                            value={form.username}
                            title='Username'/>
                        <FormField
                            error={errors.password}
                            handleChangeText={(e) => {
                                setForm(prev => ({ ...prev, password: e }));
                                setErrors(prev => ({ ...prev, password: false }));
                            }}
                            value={form.password}
                            title='Password'/>

                        <TouchableOpacity className={`mb-5 w-fit ${errors.checkbox ? 'text-red-400' : ''}`}
                                          onPress={() => setIsSlided(true)} >
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
                    </MotiView>

                    <MotiView
                        from={{
                            translateY: 0,
                        }}
                        animate={{
                            translateY: isSlided ? -640 : 0,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 500,
                        }}
                        style={{
                            position: 'absolute',
                            top: 640,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        className={`absolute left-0 top-0 w-full h-full`}>

                        <TouchableOpacity
                            onPress={() => setIsSlided(false)}
                            className='absolute w-auto h-auto p-3 left-1/2 top-0 -translate-x-1/2 z-10'>
                            <Image
                                resizeMode='contain'
                                className='!w-[30px] !h-[40px]'
                                source={icons.arrowUp}/>
                        </TouchableOpacity>

                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            className='w-full h-full'>
                            <View className="rounded-xl p-4 shadow-lg relative">
                                <Text className="text-xl font-bold text-white">Terms and Conditions</Text>

                                <Text className="mt-4 text-base color-[#a1abb8]">
                                    Violation of these rules may result in immediate account termination and legal action.
                                </Text>

                                {/*<View className="mt-6">*/}
                                {/*    <Text className="text-lg font-semibold text-white">*/}
                                {/*        Terms and Conditions*/}
                                {/*    </Text>*/}
                                {/*    <Text className="mt-2 text-base color-[#a1abb8]">*/}
                                {/*        Last Updated: [Date]*/}
                                {/*    </Text>*/}
                                {/*</View>*/}

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        1. Acceptance of Terms
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        By creating an account, participating in activities, browsing, or otherwise engaging with BetSphere, you acknowledge and agree that you have read, understood, and accepted these Terms and Conditions in their entirety. Your continued use of the platform constitutes ongoing acceptance of any changes or updates to these Terms.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        2. General Information
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        BetSphere is a platform designed for users to create and participate in predictions on a wide variety of topics and events. We offer a digital environment where users may express their opinions, forecasts, and expectations in a recreational context. The platform is provided "as is" and "as available" without warranties of any kind.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We reserve the right to modify, suspend, or discontinue the service at any time, for any reason, with or without notice, and without liability to you.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        3. User Responsibilities
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        As a user of BetSphere, you agree to:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Provide accurate and current information during the registration process.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Maintain the confidentiality of your account credentials.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Be fully responsible for all activities that occur under your account.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Use the platform in compliance with all applicable laws and regulations.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Failure to comply with these responsibilities may result in suspension or termination of your account at our sole discretion.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        4. No Financial Liability
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        BetSphere assumes no responsibility or liability for any financial loss, mismanagement of virtual or real funds, incorrect predictions, system malfunctions, or user errors.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We are under no obligation to maintain, protect, restore, or compensate any user balances, virtual currencies, points, or any associated digital items.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Users acknowledge that:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - All balances, points, tokens, and assets associated with the platform have no real-world monetary value.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - BetSphere may, at its sole discretion, reset, remove, deduct, or alter your balance at any time, for any reason, without any obligation to notify or compensate you.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Participation in activities on BetSphere is purely recreational and should not be considered a form of investment, gambling, or financial transaction.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        5. Account Management
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We reserve the right to:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Suspend, delete, or modify any account without prior notice.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Reset account balances without cause or reason.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Impose restrictions, limits, or controls over your activities and participation.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Modify or discontinue any service features without liability.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Users have no ownership rights or entitlements over their accounts, balances, or any virtual property on BetSphere.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        6. Risk Acknowledgement
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        By using BetSphere, you explicitly acknowledge that there are inherent risks associated with digital platforms, including but not limited to system failures, unauthorized access, account suspension, and data loss.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        You agree that BetSphere is not liable for any damages, losses, inconveniences, or disruptions arising from the use or inability to use our services.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Participation is entirely at your own risk.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        7. Changes to Terms
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        We reserve the right to amend, revise, or replace these Terms and Conditions at any time, without specific notice to users. It is your responsibility to review this page periodically for updates. Continued use of the platform following the posting of any changes constitutes acceptance of those changes.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        8. Prohibited Conduct
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        You agree not to engage in any activity that:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Violates any local, national, or international law or regulation.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Involves unauthorized or fraudulent use of accounts.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Attempts to manipulate outcomes or exploit platform vulnerabilities.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Distributes spam, viruses, malware, or other harmful technology.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Impersonates another individual, entity, or representative of BetSphere.
                                    </Text>
                                </View>

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
                                        To the fullest extent permitted by law, BetSphere shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Under no circumstances shall our total liability exceed the amount you paid, if any, to use our services.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        12. Indemnification
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        You agree to defend, indemnify, and hold harmless BetSphere, its affiliates, employees, agents, partners, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Your use of and access to the service.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Your violation of any term of these Terms and Conditions.
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        - Your violation of any third-party right, including without limitation any copyright, property, or privacy right.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        13. Governing Law
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        These Terms shall be governed and construed in accordance with the laws of United States of America, without regard to its conflict of law provisions.
                                    </Text>
                                </View>

                                <View className="mt-6">
                                    <Text className="text-lg font-semibold text-white">
                                        14. Contact Information
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        If you have any questions about these Terms and Conditions, please contact us at:
                                    </Text>
                                    <Text className="mt-2 text-base color-[#a1abb8]">
                                        Email: support@betsphere.com
                                    </Text>
                                </View>

                                <View className='!w-[200px] !h-[200px] mt-6'>
                                    <Video
                                        source={horse}
                                        shouldPlay
                                        resizeMode="contain"
                                        isLooping
                                        isMuted={true}
                                        style={{ width: 200, height: 200 }}
                                    />
                                </View>


                                <TouchableOpacity
                                    onPress={() => {
                                        const newChecked = !isChecked;
                                        setIsChecked(newChecked);
                                        newChecked && setIsSlided(false);
                                    } }
                                    className="mt-6 flex-row items-center">
                                    <View className="w-5 h-5 border-2 border-[#a1abb8] rounded-[4px] justify-center items-center mr-3">
                                        {isChecked && (
                                            <View className="w-3 h-3 bg-[#a1abb8] rounded-[2px]" />
                                        )}
                                    </View>

                                    <Text className="text-base color-[#a1abb8]">
                                        I have read and agree to the Terms and Conditions
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </MotiView>
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
