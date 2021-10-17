/* eslint-disable import/namespace */
/* eslint-disable import/named */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import About from './About';
const Stack = createNativeStackNavigator();

export default function AboutNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AboutScreen"
          component={About}
          options={{
            headerLargeTitle: true,
            headerTintColor: '#e4f2d6',
            title: 'About',
            headerStyle: {
              backgroundColor: '#3e423a',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
