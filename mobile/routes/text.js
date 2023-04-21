import { Button, useTheme } from 'react-native-paper'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector, useDispatch } from 'react-redux'
import SCREENS from '../constants/screens.js'
import TextDrawer from './text-drawer.js'
import TextSettings from './text-settings.js'
import defaultExport from './text-tabs.js'
import UI from '../constants/ui.js'
import { getData } from '../services/storage.js'

const Stack = createNativeStackNavigator()
const selector = (state) => state.text

function Text() {
  const dispatch = useDispatch()
  const { text } = useSelector(selector)
  const theme = useTheme()

  useEffect(() => {
    const initSettings = async () => {
      const englishFontSize = Number(await getData('englishFontSize')) || 17
      const arabicFontSize = Number(await getData('arabicFontSize')) || 19
      const isTransliterationOn = (await getData('isTransliterationOn')) ?? 'off'
      const arabicFontName = (await getData('arabicFontName')) ?? 'uthman'
      const isDarkModeOn = (await getData('isDarkModeOn')) ?? 'off'

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
        name={SCREENS.textSettings}
        component={TextSettings}
        options={{
          title: 'Text Settings'
        }}
      />
      <Stack.Screen
        name={SCREENS.textScreen}
        component={defaultExport}
        options={({ navigation }) => ({
          headerShown: true,
          title: text.title,
          headerTitle: UI.null,
          headerStyle: {
            backgroundColor: theme.colors.background,
            color: theme.colors.onSurface
          },
          headerRight: () => (
            <Button
              icon="cog"
              onPress={() => {
                navigation.navigate('TextSettings')
              }}
            />
          )
        })}
      />
    </Stack.Navigator>
  )
}

export default Text
