import { Caption, Title } from 'react-native-paper'
/* eslint-disable import/namespace */
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import COLORS from '../constants/colors.js'
import SCREENS from '../constants/screens.js'
import { StyleSheet } from 'react-native'
import TextList from '../screens/category.js'
import { getCategories } from '../services/api-service.js'
import { useFocusEffect } from '@react-navigation/core'
import packageJson from '../package.json'

const selector = (state) => state.categories

export default function TextDrawer() {
  const Drawer = createDrawerNavigator()
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()

  const style = StyleSheet.create({
    info: {
      bottom: 10,
      left: 0,
      margin: 16,
      position: 'absolute'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: 17
    }
  })

  const categoryItems = categories.map((category, index) => (
    <Drawer.Screen
      name={category.name}
      key={index}
      component={TextList}
      initialParams={{ category: category.name }}
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

  function CustomDrawerContent(props) {
    return (
      <Fragment>
        <DrawerContentScrollView {...props}>
          <Title style={style.title}>{packageJson.displayName}</Title>

          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <Caption style={style.info}>{packageJson.version}</Caption>
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
          width: 150
        },
        headerStyle: {
          backgroundColor: COLORS.shinyOlive
        },
        headerTintColor: COLORS.darkOlive,
        drawerActiveBackgroundColor: COLORS.shinyOlive
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
