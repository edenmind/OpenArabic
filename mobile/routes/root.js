import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import SCREENS from '../constants/screens.js'
import Text from './text.js'
import Words from './words.js'
import TextSettings from './text-settings.js'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { UIElements } from '../constants/ui.js'

const Tab = createMaterialBottomTabNavigator()

const darkModeSelector = (state) => state.isDarkMode

function Root() {
  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <PaperProvider theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      {/* <StatusBar
        backgroundColor={
          isDarkModeOn.isDarkMode ? CombinedDefaultTheme.colors.background : CombinedDarkTheme.colors.background
        }
        barStyle={isDarkModeOn.isDarkMode ? 'dark-content' : 'light-content'}
      /> */}
      <NavigationContainer theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
        <Tab.Navigator
          barStyle={{
            height: 75,

            backgroundColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.background
              : CombinedDarkTheme.colors.background,
            borderTopWidth: 1,
            borderTopColor: isDarkModeOn.isDarkMode
              ? CombinedDefaultTheme.colors.inverseOnSurface
              : CombinedDarkTheme.colors.inverseOnSurface
          }}
          screenOptions={({ route }) => ({
            tabBarLabel: '',

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
            }
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
