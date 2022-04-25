import COLORS from '../constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import SCREENS from '../constants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/About'

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
