import * as React from 'react'

import AboutNavigator from './AboutNavigator'
import { COLORS } from '../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAVIGATIONTHEME } from '../constants/navigationTheme'
import { NavigationContainer } from '@react-navigation/native'
import { SCREENS } from '../constants/screens'
import TextNavigator from './TextNavigator'
import { UI } from '../constants/ui'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const AppNavigator = () => (
  <NavigationContainer
    // @ts-ignore

    theme={NAVIGATIONTHEME}>
    <Tab.Navigator
      activeColor={COLORS.shinyOlive}
      inactiveColor={COLORS.branch}>
      <Tab.Screen
        name={SCREENS.text}
        component={TextNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="text" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name={SCREENS.about}
        component={AboutNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="information-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default AppNavigator
