import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import { UIElements } from '../constants/ui.js'
import defaultExport from '../screens/words.js'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

export default function TextGrammar() {
  const theme = useTheme()

  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textGrammar}
          component={defaultExport}
          options={{
            headerBackTitle: 'Back',
            headerShown: true,
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDefaultTheme.colors.background
                : CombinedDarkTheme.colors.background
            },
            headerTitleStyle: {
              color: theme.colors.onSurface,
              fontFamily: 'philosopher',
              fontSize: UIElements.UIFontSize
            },
            title: SCREENS.textGrammar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
