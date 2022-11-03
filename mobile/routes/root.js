import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import SCREENS from '../constants/screens.js'
import Settings from './settings.js'
import Text from './text.js'
import { CombinedDarkTheme } from '../constants/paper-theme.js'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const Root = () => (
  <NavigationContainer theme={CombinedDarkTheme}>
    <Tab.Navigator>
      <Tab.Screen
        name={SCREENS.text}
        component={Text}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="script-text" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name={SCREENS.settings}
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="information" color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Root
