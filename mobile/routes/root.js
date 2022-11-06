import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import SCREENS from '../constants/screens.js'
import Settings from './settings.js'
import Text from './text.js'
import { CombinedDarkTheme } from '../constants/paper-theme.js'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { StyleSheet } from 'react-native'

const Tab = createMaterialBottomTabNavigator()

const style = StyleSheet.create({
  tabBar: {
    height: 55
  }
})

const Root = () => (
  <NavigationContainer theme={CombinedDarkTheme}>
    <Tab.Navigator barStyle={style.tabBar}>
      <Tab.Screen
        name={SCREENS.text}
        component={Text}
        options={{
          tabBarLabel: '',

          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="script-text" color={color} size={26} />
        }}
      />
      <Tab.Screen
        name={SCREENS.settings}
        component={Settings}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="information" color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Root
