import { Caption, Divider, Text } from 'react-native-paper'
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
import { paperDarkTheme } from '../constants/paper-theme.js'

const selector = (state) => state.categories

const style = StyleSheet.create({
  divider: {
    margin: 15
  },
  icon: {
    height: 55,
    marginLeft: 10,
    width: 55
  },
  semver: {
    bottom: 10,
    left: 0,
    margin: 15,
    position: 'absolute'
  },
  title: {
    fontFamily: 'philosopher',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10
  },
  version: {
    bottom: 15,
    left: 0,
    margin: 15,
    position: 'absolute'
  }
})

export default function TextDrawer() {
  const Drawer = createDrawerNavigator()
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()
  const hijriYear = `${packageJson.version} ١٤٤٤ هـ`

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
          <Text style={style.title} variant="headlineSmall">
            {packageJson.displayName}
          </Text>
          <DrawerItemList {...props} />
          <Divider style={style.divider} />
        </DrawerContentScrollView>
        <Text style={style.version}>Version</Text>
        <Caption style={style.semver}>{hijriYear}</Caption>
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
        unmountOnBlur: true,
        drawerStyle: {
          width: 225
        },
        headerTintColor: 'rgb(230, 226, 217)',
        headerStyle: {
          backgroundColor: paperDarkTheme.colors.background
        },
        headerTitleStyle: {
          fontFamily: 'philosopher',
          fontWeight: 'bold',
          fontSize: 25
        }
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
