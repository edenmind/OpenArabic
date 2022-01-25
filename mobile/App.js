import React, { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native'
import TextNavigator from './screens/Texts/TextNavigator'
import AboutNavigator from './screens/About/AboutNavigator'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { track, events } from './services/Analytics'
import { COLORS } from './constants/colors'
import { NAVIGATIONTHEME } from './constants/navigationTheme'
import { PAPERTHEME } from './constants/paperTheme'

const Tab = createMaterialBottomTabNavigator()

const linking = {
  prefixes: ['https://openarabic.io', 'https://localhost/'],
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
              `${options?.webTitle ?? route?.name} - OpenArabic`
          }}>
          <Tab.Navigator
            activeColor={COLORS.shinyOlive}
            inactiveColor={COLORS.branch}>
            <Tab.Screen
              name="Text"
              component={TextNavigator}
              options={{
                tabBarLabel: 'Texts',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="book" color={color} size={26} />
                )
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutNavigator}
              options={{
                tabBarLabel: 'About',
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
