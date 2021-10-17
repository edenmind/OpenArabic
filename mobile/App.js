import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationContainerDefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextNavigator from './screens/Texts/TextNavigator';
import AboutNavigator from './screens/About/AboutNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  ...NavigationContainerDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3e423a',
    border: '#3e423a',
    text: '#3e423a',
    notification: '#3e423a',
    // background: '#fafddf',
    // card: '#fafddf',
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3e423a',
    accent: '#a4cfbe',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator>
            <Tab.Screen
              name="Text"
              component={TextNavigator}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="text" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={AboutNavigator}
              options={{
                tabBarLabel: 'About',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="information-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
