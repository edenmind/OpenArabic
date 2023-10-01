import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import SimpleText from './simple-text.js'
import TextDrawer from './text-drawer.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import About from '../screens/about.js'
import Settings from '../screens/settings.js'
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
      const settings = {
        arabicFontName: 'uthman',
        arabicFontSize: 19,
        englishFontSize: 17,
        isDarkModeOn: 'on',
        isEngOn: 'on',
        isPlayOn: 'on',
        isTransliterationOn: 'off'
      }

      for (const key in settings) {
        const value = await getData(key)
        settings[key] = value || settings[key]
      }

      dispatch({ payload: Number(settings.arabicFontSize), type: 'SET_ARABIC_FONT_SIZE' })
      dispatch({ payload: Number(settings.englishFontSize), type: 'SET_ENGLISH_FONT_SIZE' })
      dispatch({ payload: settings.isTransliterationOn, type: 'SET_TRANSLITERATION' })
      dispatch({ payload: settings.isEngOn, type: 'SET_ENG' })
      dispatch({ payload: settings.arabicFontName, type: 'SET_ARABIC_FONT_NAME' })
      dispatch({ payload: settings.isDarkModeOn === 'off', type: 'SET_DARK_MODE' })
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
        component={SimpleText}
        options={() => ({
          headerBackTitle: 'Home',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          },
          headerTitle: ''
        })}
      />
      <Stack.Screen
        name={SCREENS.settings}
        component={Settings}
        options={() => ({
          headerBackTitle: 'Back',
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          },
          headerTitle: 'Settings',
          headerTitleStyle: {
            color: theme.colors.onSurface,
            fontFamily: 'philosopher',
            fontSize: 23
          }
        })}
      />
    </Stack.Navigator>
  )
}

export default Text
