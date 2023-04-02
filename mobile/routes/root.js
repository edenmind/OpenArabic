import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import { CombinedDarkTheme, paperDarkTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import Text from './text.js'
import Words from './words.js'
import Settings from './settings.js'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'

const Tab = createMaterialBottomTabNavigator()

function Root() {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <Tab.Navigator
        barStyle={{
          height: 75,
          backgroundColor: paperDarkTheme.colors.background,
          borderTopWidth: 1,
          borderTopColor: paperDarkTheme.colors.backdrop
        }}
        screenOptions={({ route }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ color }) => {
            let iconName

            switch (route.name) {
              case SCREENS.text: {
                iconName = 'script-text'

                break
              }
              case SCREENS.words: {
                iconName = 'comment-check'

                break
              }
              case SCREENS.settings: {
                iconName = 'information'

                break
              }
              // No default
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={26} />
          }
        })}
      >
        <Tab.Screen name={SCREENS.text} component={Text} />
        <Tab.Screen name={SCREENS.words} component={Words} />
        <Tab.Screen name={SCREENS.settings} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Root
