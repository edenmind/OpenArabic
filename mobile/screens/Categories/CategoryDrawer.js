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
      key={category.name}
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
        drawerActiveBackgroundColor: '#e4f2d6',
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={TextList}
        initialParams={{ category: 'Home' }}
        options={{
          title: 'Home',
          headerShown: true,
          drawerLabel: 'Home',
        }}
        key="Home"
      />
      {categoryItems}
    </Drawer.Navigator>
  );
}
