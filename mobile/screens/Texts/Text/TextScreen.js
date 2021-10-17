import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TextBilingual from './TextBilingual';
import TextEnglish from './TextEnglish';
import TextArabic from './TextArabic';
import { useDispatch } from 'react-redux';
import { getText } from '../../../services/ApiService';
import Spinner from '../../../components/Spinner';

export default function TextScreen({ route }) {
  const Tab = createMaterialTopTabNavigator();

  const { textId = {} } = route.params;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchText = () => {
    dispatch(getText(textId));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const screenArray = [
    { name: 'Bilingual', component: TextBilingual },
    { name: 'Arabic', component: TextArabic },
    { name: 'English', component: TextEnglish },
  ];

  useEffect(() => {
    fetchText();
  }, [textId]);

  const screens = screenArray.map((screen) => (
    <Tab.Screen
      name={screen.name}
      component={screen.component}
      initialParams={{ textId }}
      key={screen.name}
    />
  ));

  if (isLoading) {
    return <Spinner />;
  } else {
    return <Tab.Navigator>{screens}</Tab.Navigator>;
  }
}

TextScreen.propTypes = {
  route: PropTypes.any.isRequired,
};
