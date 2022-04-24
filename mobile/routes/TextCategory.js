/* eslint-disable import/namespace */
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator
} from '@react-navigation/drawer'
import { Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS } from '../constants/colors'
import { Caption } from 'react-native-paper'
import { SCREENS } from '../constants/screens'
import TextList from '../screens/Category'
import { getCategories } from '../services/ApiService'
import { useFocusEffect } from '@react-navigation/core'

export default function TextCategory() {
  const Drawer = createDrawerNavigator()
  const selector = (state) => state.categories
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()

  const style = StyleSheet.create({
    info: {
      bottom: 10,
      left: 0,
      margin: 16,
      position: 'absolute'
    },
    logo: {
      marginBottom: 20,
      marginLeft: 7,
      marginTop: 30
    }
  })

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

  const version = 'Version 1.2.0'

  function CustomDrawerContent(props) {
    return (
      <Fragment>
        <DrawerContentScrollView {...props}>
          <Image source={require('../assets/oalogo.png')} style={style.logo} />
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Caption style={style.info}>{version}</Caption>
      </Fragment>
    )
  }

  const homeScreen = (
    <Drawer.Screen
      name="All"
      component={TextList}
      initialParams={{ category: 'All' }}
      options={{
        title: SCREENS.home,
        headerShown: true,
        drawerLabel: 'Home'
      }}
      key={'999'}
    />
  )

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        drawerStyle: {
          width: 230
        },
        headerStyle: {
          backgroundColor: COLORS.darkOlive
        },
        headerTintColor: COLORS.shinyOlive,
        drawerActiveBackgroundColor: COLORS.darkGrey
      }}>
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
