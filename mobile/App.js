import React, { useEffect } from 'react'
import { events, track } from './services/Analytics'

import AboutNavigator from './screens/About/AboutNavigator'
import { COLORS } from './constants/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NAVIGATIONTHEME } from './constants/navigationTheme'
import { NavigationContainer } from '@react-navigation/native'
import { PAPERTHEME } from './constants/paperTheme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { SCREENS } from './constants/screens'
import TextNavigator from './screens/Texts/TextNavigator'
import { UI } from './constants/ui'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { store } from './redux/store'

const Tab = createMaterialBottomTabNavigator()

const linking = {
  prefixes: ['https://openarabic.io', 'http://localhost/'],
  config: {
    screens: {
      Text: {
        screens: {
          TextScreen: {
            path: '/text/:textId',
            parse: {
              textId: Number
            }
          },
          TextList: {
            path: '/texts/:category',
            parse: {
              category: String
            }
          }
        }
      }
    }
  }
}
export default function App() {
  useEffect(() => {
    track(events.HOME)
  }, [])

  return (
    <Provider store={store}>
      <PaperProvider theme={PAPERTHEME}>
        <NavigationContainer
          // @ts-ignore
          linking={linking}
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
                  <MaterialCommunityIcons name="book" color={color} size={26} />
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
                    name="information"
                    color={color}
                    size={26}
                  />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
