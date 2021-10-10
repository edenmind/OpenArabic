import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextDrawer } from './TextList/TextDrawer';
import TextScreen from './Text/TextScreen';
import {
  NavigationContainer,
  DefaultTheme as NavigationContainerDefaultTheme,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...NavigationContainerDefaultTheme,
  colors: {
    ...NavigationContainerDefaultTheme.colors,
    primary: '#3e423a',
    accent: '#3e423a',
  },
};

export default function TextNavigator() {
  return (
    <NavigationContainer independent={true} theme={MyTheme}>
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
