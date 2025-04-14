import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function FormField ({title, handleChangeText, value, otherStyles}) {

	const [showPassword, setShowPassword] = useState(false)


    return (
		<View
			className='mb-4 !h-[60px] backdrop-blur-[20px]
                    bg-[rgba(163,163,163,0.06)] border border-[#314147] rounded-[10px] flex-row'>
			<TextInput
				secureTextEntry={title === 'Password' && !showPassword}
				onChangeText={handleChangeText}
				placeholder={title}
				value={value}
				placeholderTextColor='#757575'
				className={`text-xl color-[#a1abb8] h-full focus:outline-0 px-5 w-full ${otherStyles}`}/>
			{title === "Password" && (
				<TouchableOpacity
					className='justify-end items-center !w-12 !h-16 bg-red-500'
					onPress={() => setShowPassword(!showPassword)}>
					{/*<Image*/}
					{/*	source={!showPassword ? icons.eye : icons.eyeHide}*/}
					{/*	className='!w-6 !h-6'*/}
					{/*	resizeMode='contain'*/}
					{/*/>*/}
				</TouchableOpacity>
			)}
		</View>
    );
};
