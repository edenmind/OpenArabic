import COLORS from '../constants/colors.js'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/about.js'

const Stack = createNativeStackNavigator()

export default function Settings() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.settings}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            headerTintColor: COLORS.darkOlive,
            title: SCREENS.about,
            headerStyle: {
              backgroundColor: COLORS.shinyOlive
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
