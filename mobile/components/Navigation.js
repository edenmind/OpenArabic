import * as React from 'react'

import AboutNavigator from '../screens/AboutNavigator'
import { COLORS } from '../constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAVIGATIONTHEME } from '../constants/navigationTheme'
import { NavigationContainer } from '@react-navigation/native'
import { SCREENS } from '../constants/screens'
import TextNavigator from '../screens/TextNavigator'
import { UI } from '../constants/ui'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const Navigation = () => (
  <NavigationContainer
    // @ts-ignore

    theme={NAVIGATIONTHEME}
    documentTitle={{
      formatter: (options, route) =>
        `${options?.webTitle ?? route?.name} - ${UI.openArabic}`
    }}>
    <Tab.Navigator
      activeColor={COLORS.shinyOlive}
      inactiveColor={COLORS.branch}>
      <Tab.Screen
        name={SCREENS.text}
        component={TextNavigator}
        options={{
          tabBarLabel: UI.texts,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="text" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name={SCREENS.about}
        component={AboutNavigator}
        options={{
          tabBarLabel: SCREENS.about,
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

export default Navigation
