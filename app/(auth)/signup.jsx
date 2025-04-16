import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import {LinearGradient} from "expo-linear-gradient";
import FormField from "../../components/FormField";

const login = () => {

    const [isAnimating, setIsAnimating] = useState(false);
    const [form, setForm] = useState({
        username:'',
        email:'',
        password:'',
        birth:'',
    })


    const handleMouseEnter = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const duration = 1000;

        setTimeout(() => {
            setIsAnimating(false);
        }, duration);
    };


    const submit = async () => {
        console.log(form)
    }




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
                className='!w-[700px] !h-[700px] relative px-[60px] py-[50px]
                    shadow-[inset_0px_0px_8px_0px_rgba(198,198,198,0.1)]
                    rounded-[50px] border-[#252e35] backdrop-blur-[20px]
                    bg-gradient-to-[215deg] from-[rgba(120,160,200,0.45)] via-[rgba(70,100,130,0.3)] to-[rgba(20,25,30,1)]
                    border-2
                '>
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
                <FormField
                    handleChangeText={(e) => setForm({...form, birth: e})}
                    value={form.birth}
                    title='Date of Birth'/>


                <TouchableOpacity
                    onPress={submit}
                    onMouseEnter={handleMouseEnter}
                    className='w-full !h-[60px] border border-[#314147] rounded-[10px] bg-[rgba(36,48,60,0.5)] justify-center items-center relative'>

                    <Text className='color-[#a1abb8] text-xl font-bold'>Confirm</Text>

                    <View
                        className={`absolute ${isAnimating ? 'login-button-animation' : ''} left-[-150%] w-[150%] 
                        top-0 h-full bg-gradient-to-r from-transparent to-transparent 
                        via-white/[0.3] transform transition-none pointer-events-none`}
                        style={{ transform: 'translateX(0%)' }}
                    />

                </TouchableOpacity>


                <TouchableOpacity
                    className='mt-auto mx-auto'
                    onPress={() => router.push('/login')}>
                    <Text className="text-[#e9f1f4] underline">Already have an account?</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default login;
