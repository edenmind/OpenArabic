import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextDrawer } from './TextList/TextDrawer';
import TextScreen from './Text/TextScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function TextNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={TextDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleText"
          component={TextScreen}
          options={{ headerShown: true, headerTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
