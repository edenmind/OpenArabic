/* eslint-disable react/prop-types */
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Caption, Divider, Text, useTheme, IconButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import icon from '../assets/logo.png'
import SCREENS from '../constants/screens.js'
import packageJson from '../package.json'
import TextList from '../screens/text-list.js'
import { getCategories } from '../services/api-service.js'
import { getHijriYear } from '../services/utility-service.js'

const selector = (state) => state.categories

export default function TextDrawer() {
  const Drawer = createDrawerNavigator()

  const { categories } = useSelector(selector)
  const dispatch = useDispatch()
  const versionAndHijriYear = `${packageJson.version} ${getHijriYear()}`
  const theme = useTheme()

  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1
    },
    divider: {
      marginHorizontal: 15
    },
    icon: {
      height: 55,
      marginLeft: 5,
      width: 55
    },
    semver: {
      bottom: 30,
      color: theme.colors.tertiary,
      left: 0,
      margin: 15,
      position: 'absolute'
    },
    title: {
      color: theme.colors.onSurface,
      fontFamily: 'philosopher',
      marginBottom: 10,
      marginLeft: 15,
      marginTop: 10
    },
    version: {
      bottom: 35,
      color: theme.colors.onSurfaceVariant,
      left: 0,
      margin: 15,
      position: 'absolute'
    }
  })

  useEffect(() => {
    const fetchCategoriesAndMode = async () => {
      dispatch(getCategories())
    }

    fetchCategoriesAndMode()
  }, [dispatch])

  const categoryItems = categories.map((category) => (
    <Drawer.Screen
      name={category.id}
      key={category.id}
      component={TextList}
      initialParams={{ category: category.name }}
      options={{
        drawerLabel: category.name,
        headerShown: true,
        title: category.name
      }}
    />
  ))

  function CustomDrawerContent(props) {
    const { navigation } = props // Destructure the navigation prop

    return (
      <View style={style.container}>
        <DrawerContentScrollView {...props}>
          <Image source={icon} style={style.icon} />
          <Text style={style.title} variant="headlineMedium">
            {packageJson.displayName}
          </Text>

          <View style={{ maxHeight: '85%' }}>
            <DrawerItemList {...props} />
            <Divider style={style.divider} />
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
              <Text
                style={{ color: theme.colors.outline, marginLeft: 10, marginTop: 10, paddingLeft: 9 }}
                variant="labelLarge"
              >
                About
              </Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>

        <Text style={style.version} variant="labelMedium">
          Version
        </Text>
        <Caption style={style.semver}>{versionAndHijriYear}</Caption>
      </View>
    )
  }

  const homeScreen = (
    <Drawer.Screen
      name="All"
      testID="homeScreen"
      component={TextList}
      initialParams={{ category: 'All' }}
      options={({ navigation }) => ({
        drawerLabel: SCREENS.home,

        headerRight: () => (
          <IconButton icon="cog" color={theme.colors.secondary} onPress={() => navigation.navigate('Settings')} />
        ),
        headerShown: true,
        title: SCREENS.home
      })}
      key={'999'}
    />
  )

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => <IconButton icon="menu" onPress={() => navigation.toggleDrawer()} />,
        headerTintColor: theme.colors.secondary,
        headerTitleStyle: {
          color: theme.colors.onSurface,
          fontFamily: 'philosopher',
          fontSize: 23
        },
        unmountOnBlur: true
      })}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
