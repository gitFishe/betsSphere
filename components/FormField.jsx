import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';

import {icons} from "../constants"

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
					className='items-center justify-center !w-[60px]'
					onPress={() => setShowPassword(!showPassword)}>
					<Image
						source={!showPassword ? icons.eyeOpened : icons.eyeClosed}
						className='!w-8 !h-8'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</View>
    );
};
