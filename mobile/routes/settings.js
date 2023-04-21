import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/about.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'

import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

export default function Settings() {
  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.settings}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            title: SCREENS.about,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontWeight: 'bold',
              fontSize: 25
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
