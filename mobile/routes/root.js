import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
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

  return (
    <PaperProvider theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <NavigationContainer theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
        <Tab.Navigator
          barStyle={{
            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background,
            borderTopColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.inverseOnSurface
              : CombinedDarkTheme.colors.inverseOnSurface,
            borderTopWidth: 1,
            height: 75
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName

              switch (route.name) {
                case SCREENS.text: {
                  iconName = 'text'
                  break
                }
                case SCREENS.words: {
                  iconName = 'abjad-arabic'
                  break
                }
                case SCREENS.settings: {
                  iconName = 'cog'
                  break
                }
              }

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
