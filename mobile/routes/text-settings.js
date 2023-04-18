import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TextSettingsScreen from '../screens/text-settings.js'
import { CombinedDarkTheme, paperDarkTheme } from '../constants/paper-theme.js'

const Stack = createNativeStackNavigator()

export default function TextSettings() {
  return (
    <NavigationContainer independent theme={CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textSettings}
          component={TextSettingsScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: paperDarkTheme.colors.background
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
