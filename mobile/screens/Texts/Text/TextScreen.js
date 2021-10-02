import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextBilingual from './TextBilingual';
import TextEnglish from './TextEnglish';
import TextArabic from './TextArabic';

export default function TextScreen({ route }) {
  const Tab = createMaterialTopTabNavigator();

  const { textId } = route.params;

  const screenArray = [
    { name: 'Bilingual', component: TextBilingual },
    { name: 'Arabic', component: TextArabic },
    { name: 'English', component: TextEnglish },
  ];

  const screens = screenArray.map((screen) => (
    <Tab.Screen
      name={screen.name}
      component={screen.component}
      initialParams={{ textId }}
      key={screen.name}
    />
  ));

  return <Tab.Navigator>{screens}</Tab.Navigator>;
}

TextScreen.propTypes = {
  route: PropTypes.string.isRequired,
};
