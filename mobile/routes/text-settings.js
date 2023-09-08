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

export default function TextSettings() {
  const isDarkModeOn = useSelector(darkModeSelector)
  const theme = useTheme()

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textSettings}
          component={TextSettingsScreen}
          options={{
            headerLargeTitle: false,
            title: SCREENS.settings,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontSize: UIElements.TitleFont,
              color: theme.colors.onSurface
            },
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
