import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TextList from '../Texts/TextList/TextList'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../services/ApiService'
import { useFocusEffect } from '@react-navigation/core'
import { COLORS } from '../../constants/colors'
import { SCREENS } from '../../constants/screens'

export default function CategoryDrawer() {
  const Drawer = createDrawerNavigator()
  const selector = (state) => state.categories
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()

  const categoryItems = categories.map((category) => (
    <Drawer.Screen
      name={category.name}
      component={TextList}
      initialParams={{ category: category.name }}
      options={{
        title: category.name,
        headerShown: true,
        drawerLabel: category.name
      }}
      key={category.categroyId}
    />
  ))

  useFocusEffect(
    React.useCallback(() => {
      const fetchCategories = () => dispatch(getCategories())
      fetchCategories()
    }, [dispatch])
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
      <Drawer.Screen
        name="All"
        component={TextList}
        initialParams={{ category: 'All' }}
        options={{
          title: SCREENS.home,
          headerShown: true,
          drawerLabel: SCREENS.home
        }}
        key={'999'}
      />
      {categoryItems}
    </Drawer.Navigator>
  )
}
