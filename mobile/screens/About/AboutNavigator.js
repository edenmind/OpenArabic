import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import About from './About'
import { COLORS } from '../../constants/colors'

const Stack = createNativeStackNavigator()

export default function AboutNavigator() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="AboutScreen"
          component={About}
          options={{
            headerLargeTitle: true,
            headerTintColor: COLORS.lightOlive,
            title: 'About',
            headerStyle: {
              backgroundColor: COLORS.darkOlive
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
