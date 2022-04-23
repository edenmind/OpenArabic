import { useDispatch, useSelector } from 'react-redux'

import { COLORS } from '../constants/colors'
import React from 'react'
import { SCREENS } from '../constants/screens'
import TextList from './ListText'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getCategories } from '../services/ApiService'
import { useFocusEffect } from '@react-navigation/core'

export default function CategoryDrawer() {
  const Drawer = createDrawerNavigator()
  const selector = (state) => state.categories
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()

  const categoryItems = categories.map((category, index) => (
    <Drawer.Screen
      name={category.name}
      key={index}
      component={TextList}
      initialParams={{ category: category.id }}
      options={{
        title: category.name,
        headerShown: true,
        drawerLabel: category.name
      }}
    />
  ))

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCategories())
    }, [dispatch])
  )

  const homeScreen = (
    <Drawer.Screen
      name="All"
      component={TextList}
      initialParams={{ category: 'All' }}
      options={{
        title: SCREENS.home,
        headerShown: true,
        drawerLabel: 'All'
      }}
      key={'999'}
    />
  )

  return (
    <Drawer.Navigator
      screenOptions={{
        unmountOnBlur: true,
        drawerStyle: {
          width: 170
        },
        headerStyle: {
          backgroundColor: COLORS.darkOlive
        },
        headerTintColor: COLORS.shinyOlive,
        drawerActiveBackgroundColor: COLORS.leaf
      }}>
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
