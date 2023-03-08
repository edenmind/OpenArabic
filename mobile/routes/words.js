import { NavigationContainer } from '@react-navigation/native'
import { Button, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/words.js'
import { CombinedDarkTheme } from '../constants/paper-theme.js'
import { useDispatch, useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics'

const Stack = createNativeStackNavigator()
const practicingWordsSelector = (state) => state.practicingWords

export default function Words() {
  const dispatch = useDispatch()
  const { practicingWords } = useSelector(practicingWordsSelector)

  return (
    <NavigationContainer independent theme={CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.words}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            title: SCREENS.words,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontWeight: 'bold',
              fontSize: 25
            },
            headerRight: () =>
              practicingWords && (
                <Fragment>
                  <Button
                    mode="text"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Error)
                      dispatch({
                        type: 'SET_PRACTICING_WORDS',
                        payload: false
                      })
                    }}
                  >
                    <Text>Stop</Text>
                  </Button>
                </Fragment>
              )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
