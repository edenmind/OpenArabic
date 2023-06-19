import { NavigationContainer } from '@react-navigation/native'
import { Button, useTheme } from 'react-native-paper'
import React, { Fragment } from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/words.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import { useDispatch, useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

const Stack = createNativeStackNavigator()
const practicingWordsSelector = (state) => state.practicingWords
const darkModeSelector = (state) => state.isDarkMode

export default function Words() {
  const dispatch = useDispatch()
  const { practicingWords } = useSelector(practicingWordsSelector)
  const theme = useTheme()

  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.words}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            title: SCREENS.words,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontSize: 25,
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
                    icon={'stop'}
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
