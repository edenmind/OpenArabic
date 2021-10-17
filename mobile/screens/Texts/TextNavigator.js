import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryDrawer } from '../Categories/CategoryDrawer';
import TextScreen from './Text/TextScreen';

const Stack = createNativeStackNavigator();

export default function TextNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={CategoryDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TextScreen"
        component={TextScreen}
        options={{
          headerShown: true,
          headerTintColor: '#e4f2d6',
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#3e423a',
          },
        }}
      />
    </Stack.Navigator>
  );
}
