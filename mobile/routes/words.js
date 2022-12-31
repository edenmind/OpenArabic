import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/words.js'
import { CombinedDarkTheme } from '../constants/paper-theme.js'

const Stack = createNativeStackNavigator()

export default function Words() {
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
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
