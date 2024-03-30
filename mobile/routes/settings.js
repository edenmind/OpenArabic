import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import { UIElements } from '../constants/ui.js'
import TextSettingsScreen from '../screens/settings.js'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

export default function Settings() {
  const isDarkModeOn = useSelector(darkModeSelector)
  const theme = useTheme()

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textSettings}
          component={TextSettingsScreen}
          options={{
            headerLargeTitle: false,
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDarkTheme.colors.background
                : CombinedDefaultTheme.colors.background
            },
            headerTitleStyle: {
              color: theme.colors.onSurface,
              fontFamily: 'philosopher',
              fontSize: UIElements.TitleFont
            },
            title: SCREENS.settings
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
