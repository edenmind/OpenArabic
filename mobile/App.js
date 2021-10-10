import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextNavigator from './screens/Texts/TextNavigator';
import AboutNavigator from './screens/About/AboutNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
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
