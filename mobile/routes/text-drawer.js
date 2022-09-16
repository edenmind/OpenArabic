import { Caption, Title, Text } from 'react-native-paper'
/* eslint-disable import/namespace */
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../constants/colors.js'
import SCREENS from '../constants/screens.js'
import { StyleSheet, Image } from 'react-native'
import TextList from '../screens/category.js'
import { getCategories } from '../services/api-service.js'
import { useFocusEffect } from '@react-navigation/core'
import packageJson from '../package.json'
import icon from '../assets/logo.png'

const selector = (state) => state.categories

export default function TextDrawer() {
  const Drawer = createDrawerNavigator()
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()

  const style = StyleSheet.create({
    icon: {
      height: 55,
      marginLeft: 17,
      width: 55
    },
    semver: {
      bottom: 10,
      left: 0,
      margin: 16,
      position: 'absolute'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: 17
    },
    version: {
      bottom: 15,
      color: COLORS.darkOlive,
      left: 0,
      margin: 16,
      position: 'absolute'
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
          <Image source={icon} style={style.icon} />
          <Title style={style.title}>{packageJson.displayName}</Title>

          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <Text style={style.version}>Version</Text>
        <Caption style={style.semver}>{packageJson.version}</Caption>
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
        drawerStyle: {
          width: 175
        },
        headerStyle: {
          backgroundColor: COLORS.shinyOlive
        },
        headerTintColor: COLORS.darkOlive,
        drawerActiveTintColor: COLORS.lightOlive,
        drawerActiveBackgroundColor: COLORS.darkOlive
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
