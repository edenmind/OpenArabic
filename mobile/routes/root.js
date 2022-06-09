import * as React from 'react'

import COLORS from '../constants/colors.js'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NAVIGATIONTHEME from '../constants/navigation-theme.js'
import { NavigationContainer } from '@react-navigation/native'
import SCREENS from '../constants/screens.js'
import Settings from './settings.js'
import Text from './text.js'
import UI from '../constants/ui.js'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const Root = () => (
  <NavigationContainer
    // @ts-ignore

    theme={NAVIGATIONTHEME}
  >
    <Tab.Navigator
      activeColor={COLORS.darkOlive}
      inactiveColor={COLORS.branch}
      barStyle={{ backgroundColor: COLORS.shinyOlive }}
    >
      <Tab.Screen
        name={SCREENS.text}
        label={UI.null}
        component={Text}
        options={{
          tabBarLabel: UI.null,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="script-text" color={color} size={25} />
        }}
      />
      <Tab.Screen
        name={SCREENS.settings}
        component={Settings}
        options={{
          tabBarLabel: UI.null,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={25} />
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Root
