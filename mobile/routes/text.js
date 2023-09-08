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

      dispatch({ type: 'SET_ARABIC_FONT_SIZE', payload: arabicFontSize })
      dispatch({ type: 'SET_ENGLISH_FONT_SIZE', payload: englishFontSize })
      dispatch({ type: 'SET_TRANSLITERATION', payload: isTransliterationOn })
      dispatch({ type: 'SET_ARABIC_FONT_NAME', payload: arabicFontName })
      dispatch({ type: 'SET_DARK_MODE', payload: isDarkModeOn === 'off' })
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
          headerTitle: 'Grammar Lesson',
          headerTitleStyle: {
            fontFamily: 'philosopher',
            fontSize: 25,
            color: theme.colors.onSurface
          },

          headerStyle: {
            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background
          }
        }}
      />
      <Stack.Screen
        name={SCREENS.about}
        component={About}
        options={{
          headerTitle: 'About',
          headerTitleStyle: {
            fontFamily: 'philosopher',
            fontSize: 23,
            color: theme.colors.onSurface
          },

          headerStyle: {
            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background
          }
        }}
      />
      <Stack.Screen
        name={SCREENS.textScreen}
        component={defaultExport}
        options={() => ({
          headerShown: true,
          headerBackTitle: 'Back',
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          }
        })}
      />
    </Stack.Navigator>
  )
}

export default Text
