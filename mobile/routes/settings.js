import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/about.js'
import { CombinedDarkTheme, paperDarkTheme } from '../constants/paper-theme.js'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <NavigationContainer independent theme={CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.settings}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            title: SCREENS.about,
            headerTitleStyle: {
              fontFamily: 'philosopher',
              fontWeight: 'bold',
              fontSize: 25
            },
            headerStyle: {
              backgroundColor: paperDarkTheme.colors.background
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
