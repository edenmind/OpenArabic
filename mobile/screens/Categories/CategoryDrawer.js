import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextList } from '../Texts/TextList/TextList';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../services/ApiService';
import { useFocusEffect } from '@react-navigation/core';

export function CategoryDrawer() {
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
      options={{
        title: category.name,
        headerShown: true,
        drawerLabel: category.name,
      }}
      key={category.categroyId}
    />
  ));

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, []),
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        drawerStyle: {
          width: 170,
        },
        headerStyle: {
          backgroundColor: '#3e423a',
        },
        headerTintColor: '#fafddf',
        drawerActiveBackgroundColor: '#a4cfbe',
      }}>
      <Drawer.Screen
        name="All"
        component={TextList}
        initialParams={{ category: 'All' }}
        options={{
          title: 'Home',
          headerShown: true,
          drawerLabel: '🚀 Home',
        }}
        key={'999'}
      />
      {categoryItems}
    </Drawer.Navigator>
  );
}
