import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/words.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import { useSelector } from 'react-redux'
import { UIElements } from '../constants/ui.js'

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
            headerLargeTitle: false,
            title: SCREENS.textGrammar,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontSize: UIElements.UIFontSize,
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
