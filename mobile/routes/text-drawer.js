import { Caption, Text, Title } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SCREENS from '../constants/screens.js'
import TextList from '../screens/text-list.js'
import { getCategories } from '../services/api-service.js'
import icon from '../assets/logo.png'
import packageJson from '../package.json'
import { useFocusEffect } from '@react-navigation/core'
import COLORS from '../constants/colors.js'

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
      left: 0,
      margin: 16,
      position: 'absolute'
    }
  })

  const categoryItems = categories.map((category) => (
    <Drawer.Screen
      name={category.id}
      key={category.id}
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
      testID="homeScreen"
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
          width: 200
        },
        headerTintColor: 'rgb(230, 226, 217)'
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
