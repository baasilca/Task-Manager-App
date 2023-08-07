import React from 'react';
import Store from './src/store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from '././src/Screens/HomeStack'
import {StatusBar} from 'react-native'

export default Main = () => {

  const Stack = createNativeStackNavigator();
  return (
    <Store>
        <StatusBar backgroundColor={"#7c4afa"} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  )
}
