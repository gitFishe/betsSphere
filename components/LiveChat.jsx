import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput, Image, FlatList, TouchableOpacity} from 'react-native';
import {icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {connectWebSocketWithAuth} from "../lib/authServices";

const Message = ({content:{avatar,username,message}}) => {
	return (
		<View className="mb-4 bg-[#1f2229] pt-[15px] pb-[21px] px-[25px] rounded-[22px] shadow-custom-shadow flex-col">
			<View className='flex-row mb-2'>
				<Image
					source='https://randomuser.me/api/portraits/men/1.jpg'
					className="!h-[30] w-[30] rounded-[10px] mr-3"
				/>
				<Text className="text-text text-2xl font-semibold">{username}</Text>
			</View>
			<View className="flex-1">
				<Text className="text-text text-[22px] leading-7 font-bold">{message}</Text>
			</View>
		</View>
	);
};


export default function LiveChat ({eventId}) {

	const ws = useRef(null);

	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [focused, setFocused] = useState(false)

	const flatListRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		const connect = async () => {
			try {
				const socket = await connectWebSocketWithAuth('ws://46.63.69.24/v1/1/chat');

				ws.current = socket;

				socket.onopen = () => console.log('WebSocket connected');
				socket.onmessage = (event) => {
					try {
						const msg = JSON.parse(event.data);
						console.log('msg', msg)
						setData((prev) => [...prev, msg]);
					} catch (e) {
						console.error('Ошибка парсинга сообщения:', e);
					}
				};
				socket.onerror = (e) => console.error('WebSocket error:', e.message);
				socket.onclose = () => console.log('WebSocket disconnected');
			} catch (err) {
				console.error('Socket connect error:', err.message);
			}
		};

		connect();

		return () => {
			ws.current?.close();
		};
	}, []);



	const [data, setData] = useState([
		{
			$id: '1',
			message: 'Hi, nigga my nigga my nigga black black black',
			username: 'Homie',
			avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		},
		{
			$id: '2',
			message: 'Chicken Jackey',
			username: 'Homie',
			avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
		},
	]);


	const showButton = message.trim().length > 0;

	const sendMessage = async () => {
		if (!message.trim()) return;

		const newMessage = {
			action:0,
			message:message
		};

		ws.current?.send(JSON.stringify(newMessage));

		setMessage('');
		inputRef.current?.focus();
	};


	useEffect(() => {
		flatListRef.current?.scrollToEnd({ animated: true });
	}, [data]);

    return (
        <View className='defaultCompStyle !w-[450px] border-[3px] border-[#1e1f23] !h-[600px]'>
			<View className='pb-[15px] px-[30px] pt-[24px] border-b-[3px] border-[#1e1f23]'>
			   <Text className='text-[40px] leading-10 text-[#E7E7E7] font-bold'>Live Chat</Text>
			</View>

			<FlatList
				showsVerticalScrollIndicator={false}
				ref={flatListRef}
				className='px-7'
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({item}) => (
					<Message content={item}/>
				)}
				ListHeaderComponent={({}) => (
					<></>
				)}
				ListEmptyComponent={() => (
					<Text className='text-center text-text text-4xl '>
						Be first who left a message!
					</Text>
				)}
			/>

			<View className='py-5 px-[30px] border-t-[3px] border-[#1e1f23]'>
				<View className='rounded-[27px] relative bg-[#1f2229] shadow-custom-shadow color !h-[70px]'>
					<TextInput
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						placeholderTextColor='#9898a0'
						className='text-3xl focus:border-transparent focus:outline-none color-[#E7E7E7] py-4 pl-[20px] pr-[70px] font-bold'
						placeholder="Write a message..."
						value={message}
						onChangeText={setMessage}
						onSubmitEditing={sendMessage}
						returnKeyType="send"
						ref={inputRef}
					/>

					<TouchableOpacity
						className={`!w-10 !h-full flex justify-center items-center absolute right-5 -translate-y-1/2 top-1/2  ${showButton ? 'block' : 'hidden'}`}
						onPress={sendMessage}
						disabled={loading}>
						<Image
							className='!w-8 !h-8'
							resizeMode='contain'
							source={icons.send}/>
					</TouchableOpacity>
				</View>

			</View>
        </View>
    );
};
