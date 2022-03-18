import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import About from './About'
import { COLORS } from '../../constants/colors'
import { SCREENS } from '../../constants/screens'

const Stack = createNativeStackNavigator()

export default function AboutNavigator() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.about}
          component={About}
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
