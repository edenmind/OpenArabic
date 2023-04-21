import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TextSettingsScreen from '../screens/text-settings.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const darkModeSelector = (state) => state.isDarkMode

export default function TextSettings() {
  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textSettings}
          component={TextSettingsScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDefaultTheme.colors.background
                : CombinedDarkTheme.colors.background
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
