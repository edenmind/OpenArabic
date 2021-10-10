import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextList } from './TextList';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../services/ApiService';

export function TextDrawer() {
  const Drawer = createDrawerNavigator();
  const selector = (state) => state.categories;
  const { categories } = useSelector(selector);
  const dispatch = useDispatch();
  const fetchCategories = () => dispatch(getCategories());

  const categoryItems = categories.map((category) => (
    <Drawer.Screen
      name={category.name}
      component={TextList}
      initialParams={{ category: category.name }}
      options={{ title: category.name, headerShown: true }}
      key={category.name}
    />
  ));

  useEffect(() => {
    fetchCategories();
  });

  return (
    <Drawer.Navigator initialRouteName="Texts">
      <Drawer.Screen
        name="HomeScreen"
        component={TextList}
        initialParams={{ category: '' }}
        options={{ title: 'Home', headerShown: true }}
        key="HomeScreen"
      />
      {categoryItems}
    </Drawer.Navigator>
  );
}
