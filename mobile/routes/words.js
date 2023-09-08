import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Haptics from 'expo-haptics'
import React, { Fragment } from 'react'
import { Button, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import defaultExport from '../screens/words.js'

const Stack = createNativeStackNavigator()
const practicingWordsSelector = (state) => state.practicingWords
const darkModeSelector = (state) => state.isDarkMode

export default function Words() {
  const dispatch = useDispatch(),
    { practicingWords } = useSelector(practicingWordsSelector),
    theme = useTheme(),
    isDarkModeOn = useSelector(darkModeSelector)

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.words}
          component={defaultExport}
          options={{
            title: SCREENS.words,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontSize: 23,
              color: theme.colors.onSurface
            },
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDefaultTheme.colors.background
                : CombinedDarkTheme.colors.background
            },
            headerRight: () =>
              practicingWords && (
                <Fragment>
                  <Button
                    textColor={theme.colors.error}
                    style={{ marginRight: -5 }}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                      dispatch({
                        type: 'SET_PRACTICING_WORDS',
                        payload: false
                      })
                    }}
                  >
                    Stop
                  </Button>
                </Fragment>
              )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
