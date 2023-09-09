import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import TextDrawer from './text-drawer.js'
import defaultExport from './text-tabs.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import About from '../screens/about.js'
import TextGrammar from '../screens/text-grammar.js'
import { getData } from '../services/storage.js'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

function Text() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isDarkModeOn = useSelector(darkModeSelector)

  useEffect(() => {
    const initSettings = async () => {
      const englishFontSize = Number(await getData('englishFontSize')) || 17
      const arabicFontSize = Number(await getData('arabicFontSize')) || 19
      const isTransliterationOn = (await getData('isTransliterationOn')) ?? 'off'
      const arabicFontName = (await getData('arabicFontName')) ?? 'uthman'
      const isDarkModeOn = (await getData('isDarkModeOn')) ?? 'on'

      dispatch({ payload: arabicFontSize, type: 'SET_ARABIC_FONT_SIZE' })
      dispatch({ payload: englishFontSize, type: 'SET_ENGLISH_FONT_SIZE' })
      dispatch({ payload: isTransliterationOn, type: 'SET_TRANSLITERATION' })
      dispatch({ payload: arabicFontName, type: 'SET_ARABIC_FONT_NAME' })
      dispatch({ payload: isDarkModeOn === 'off', type: 'SET_DARK_MODE' })
    }

    initSettings()
  }, [dispatch])

  return (
    <Stack.Navigator initialRouteName={SCREENS.home}>
      <Stack.Screen name={SCREENS.home} component={TextDrawer} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREENS.textGrammar}
        component={TextGrammar}
        options={{
          headerStyle: {
            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background
          },
          headerTitle: 'Grammar Lesson',
          headerTitleStyle: {
            color: theme.colors.onSurface,
            fontFamily: 'philosopher',
            fontSize: 25
          }
        }}
      />
      <Stack.Screen
        name={SCREENS.about}
        component={About}
        options={{
          headerStyle: {
            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background
          },
          headerTitle: 'About',
          headerTitleStyle: {
            color: theme.colors.onSurface,
            fontFamily: 'philosopher',
            fontSize: 23
          }
        }}
      />
      <Stack.Screen
        name={SCREENS.textScreen}
        component={defaultExport}
        options={() => ({
          headerBackTitle: 'Back',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          },
          headerTitle: ''
        })}
      />
    </Stack.Navigator>
  )
}

export default Text
