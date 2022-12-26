import { Button } from 'react-native-paper'
import React, { Fragment } from 'react'
import SCREENS from '../constants/screens.js'
import TextDrawer from './text-drawer.js'
import UI from '../constants/ui.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from './text-tabs.js'
import { useSelector, useDispatch } from 'react-redux'
import TextSettings from './text-settings.js'
const Stack = createNativeStackNavigator()
const selector = (state) => state.text
import { getData } from '../services/storage.js'

function Text() {
  const dispatch = useDispatch()
  React.useEffect(() => async () => {
    // read from store
    const englishFontSize = await getData('englishFontSize')
    const arabicFontSize = await getData('arabicFontSize')
    const isTransliterationOn = await getData('isTransliterationOn')
    const arabicFontName = await getData('arabicFontName')

    //set the arabic font size using dispatch
    const setArabicFontSize = (size) => {
      dispatch({ type: 'SET_ARABIC_FONT_SIZE', payload: size })
    }

    //set the english font size using dispatch
    const setEnglishFontSize = (size) => {
      dispatch({ type: 'SET_ENGLISH_FONT_SIZE', payload: size })
    }

    //set the transliteration using dispatch
    const setIsTransliterationOn = (value) => {
      dispatch({ type: 'SET_TRANSLITERATION', payload: value })
    }

    //set the arabic fontname using dispatch
    const setArabicFontName = (name) => {
      dispatch({ type: 'SET_ARABIC_FONT_NAME', payload: name })
    }

    setArabicFontSize(arabicFontSize)
    setEnglishFontSize(englishFontSize)
    setIsTransliterationOn(isTransliterationOn)
    setArabicFontName(arabicFontName)
  })

  const { text } = useSelector(selector)

  return (
    <Fragment>
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
            headerRight: () => (
              <Fragment>
                <Button
                  icon="cog"
                  onPress={() => {
                    navigation.navigate('TextSettings')
                  }}
                />
              </Fragment>
            )
          })}
        />
      </Stack.Navigator>
    </Fragment>
  )
}

export default Text
