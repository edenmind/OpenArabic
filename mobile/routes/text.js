import { Button, useTheme } from 'react-native-paper'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import SCREENS from '../constants/screens.js'
import TextDrawer from './text-drawer.js'
import TextSettings from './text-settings.js'
import defaultExport from './text-tabs.js'
import { getData } from '../services/storage.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import TextGrammar from '../screens/text-grammar.js'

const Stack = createNativeStackNavigator()
const selector = (state) => state.text
const darkModeSelector = (state) => state.isDarkMode

function Text() {
  const dispatch = useDispatch()
  const { text } = useSelector(selector)
  const theme = useTheme()
  const isDarkModeOn = useSelector(darkModeSelector)
  const FONT = 'Font'

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
        name={SCREENS.textSettings}
        component={TextSettings}
        options={{
          headerTitle: 'Font Settings',
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
        name={SCREENS.textScreen}
        component={defaultExport}
        options={({ navigation }) => ({
          headerShown: true,
          title: text.title,
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          },
          headerRight: () => (
            <Button
              icon="format-size"
              onPress={() => {
                navigation.navigate('TextSettings')
              }}
            >
              {FONT}
            </Button>
          )
        })}
      />
    </Stack.Navigator>
  )
}

export default Text
