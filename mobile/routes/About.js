import { COLORS } from '../constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SCREENS } from '../constants/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from '../screens/About'

const Stack = createNativeStackNavigator()

export default function About() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.about}
          component={defaultExport}
          options={{
            headerLargeTitle: false,
            headerTintColor: COLORS.lightOlive,
            title: SCREENS.about,
            headerStyle: {
              backgroundColor: COLORS.darkOlive
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
