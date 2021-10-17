import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TextList } from '../Texts/TextList/TextList';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../services/ApiService';

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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Texts"
      screenOptions={{
        drawerStyle: {
          width: 170,
        },
        headerStyle: {
          backgroundColor: '#3e423a',
        },
        headerTintColor: '#e4f2d6',
        drawerActiveBackgroundColor: '#a4cfbe',
      }}>
      <Drawer.Screen
        name="All"
        component={TextList}
        initialParams={{ category: 'All' }}
        options={{
          title: 'All',
          headerShown: true,
          drawerLabel: 'All',
        }}
        key="11"
      />
      {categoryItems}
    </Drawer.Navigator>
  );
}
