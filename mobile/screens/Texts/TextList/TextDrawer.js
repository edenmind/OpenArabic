import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextListScreen } from './TextListScreen';
import * as api from '../../../services/ApiService';

export function TextDrawer() {
  const Drawer = createDrawerNavigator();
  const [categories, setCategories] = useState([
    { categoryId: 0, name: 'Adab' },
  ]);

  const categoryItems = categories.map((category) => (
    <Drawer.Screen
      name={category.name}
      component={TextListScreen}
      initialParams={{ category: category.name }}
      options={{ title: category.name, headerShown: true }}
      key={category.name}
    />
  ));

  useEffect(() => {
    async function fetchData() {
      const result = await api.getCategories();
      setCategories(result);
    }
    fetchData();
  }, [setCategories]);

  return (
    <Drawer.Navigator initialRouteName="Texts">
      {categoryItems}
    </Drawer.Navigator>
  );
}
