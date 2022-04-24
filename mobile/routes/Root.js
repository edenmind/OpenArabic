import * as React from 'react'

import About from './About'
import { COLORS } from '../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAVIGATIONTHEME } from '../constants/navigationTheme'
import { NavigationContainer } from '@react-navigation/native'
import { SCREENS } from '../constants/screens'
import Text from './Text'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const Root = () => (
  <NavigationContainer
    // @ts-ignore

    theme={NAVIGATIONTHEME}>
    <Tab.Navigator activeColor={COLORS.shinyOlive} inactiveColor={COLORS.branch}>
      <Tab.Screen
        name={SCREENS.text}
        component={Text}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="text" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name={SCREENS.about}
        component={About}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="information-outline" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Root
