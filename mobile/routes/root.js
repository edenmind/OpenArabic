import { NavigationContainer } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'

import TextSettings from './settings.js'
import Text from './text.js'
import Words from './words.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import { UIElements } from '../constants/ui.js'

const Tab = createMaterialBottomTabNavigator()

const darkModeSelector = (state) => state.isDarkMode

function Root() {
  const isDarkModeOn = useSelector(darkModeSelector)

  // Using useMemo for better performance
  const activeTheme = useMemo(() => {
    return isDarkModeOn ? CombinedDarkTheme : CombinedDefaultTheme
  }, [isDarkModeOn])

  // Icon mapping
  const getIconName = (routeName) => {
    switch (routeName) {
      case SCREENS.text: {
        return 'text'
      }
      case SCREENS.words: {
        return 'abjad-arabic'
      }
      case SCREENS.settings: {
        return 'cog'
      }
      default: {
        return 'question'
      }
    }
  }

  return (
    <PaperProvider theme={activeTheme}>
      <NavigationContainer theme={activeTheme}>
        <Tab.Navigator
          barStyle={{
            backgroundColor: activeTheme.colors.background,
            borderTopColor: activeTheme.colors.inverseOnSurface,
            borderTopWidth: 1,
            height: 75
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              const iconName = getIconName(route.name)
              return <MaterialCommunityIcons name={iconName} color={color} size={UIElements.TitleFont} />
            },
            tabBarLabel: ''
          })}
        >
          <Tab.Screen name={SCREENS.text} component={Text} />
          <Tab.Screen name={SCREENS.words} component={Words} />
          <Tab.Screen name={SCREENS.settings} component={TextSettings} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Root
