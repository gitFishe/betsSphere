import React from 'react';
import { View, Text, Image} from 'react-native';

const profile = () => {
  return (
    <View>

     <View>
         <Image className='!w-60 !h-60'/>
         <View>
             <Text>Username</Text>
             <Text>Online</Text>
         </View>
     </View>

     <View className='gap-5'>
        <View className='p-[30px] !w-[400px] border-2 rounded-[30px] border-gray-light bg-primary-light'>
            <View>
                <Image className='!w-20 !h-20'/>
                <Text className='text-[#E7E7E7]'>Positions value</Text>
            </View>
            <Text className='text-[#E7E7E7]'>$2.600.30</Text>
        </View>

     </View>

    </View>
  );
};

export default profile;
