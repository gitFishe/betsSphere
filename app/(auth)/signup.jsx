import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';

const signup = () => {
  return (
      <View className="flex-1 justify-center items-center bg-black">
          <Text className="text-white text-xl mb-4">Sign Up</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-blue-400">Already have an account? Sign In</Text>
          </TouchableOpacity>
      </View>
  );
};

export default signup;
