import { Caption, Divider, Switch, Text } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { Image, StyleSheet } from 'react-native'
import React from 'react'
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
  darkLightMode: {
    bottom: 45,
    left: 0,
    margin: 15,
    position: 'absolute'
  },
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
    color: paperDarkTheme.colors.tertiary,
    left: 0,
    margin: 15,
    position: 'absolute'
  },
  title: {
    color: paperDarkTheme.colors.onSurface,
    fontFamily: 'philosopher',
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10
  },
  version: {
    bottom: 15,
    color: paperDarkTheme.colors.onSurfaceVariant,
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
      <>
        <DrawerContentScrollView {...props}>
          <Image source={icon} style={style.icon} />
          <Text style={style.title} variant="headlineSmall">
            {packageJson.displayName}
          </Text>
          <DrawerItemList {...props} />
          <Divider style={style.divider} />
        </DrawerContentScrollView>
        <Switch value={false} style={style.darkLightMode} />
        <Text style={style.version} variant="labelMedium">
          Version
        </Text>
        <Caption style={style.semver}>{hijriYear}</Caption>
      </>
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
        headerTintColor: paperDarkTheme.colors.onBackground,
        headerStyle: {
          backgroundColor: paperDarkTheme.colors.background
        },
        headerTitleStyle: {
          fontFamily: 'philosopher',
          fontSize: 23,
          color: paperDarkTheme.colors.onSurface
        }
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
