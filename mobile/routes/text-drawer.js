/* eslint-disable react/prop-types */
import { Caption, Divider, Switch, Text, useTheme } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SCREENS from '../constants/screens.js'
import TextList from '../screens/text-list.js'
import { getCategories } from '../services/api-service.js'
import icon from '../assets/logo.png'
import packageJson from '../package.json'
import { useFocusEffect } from '@react-navigation/core'
import { storeData, getData } from '../services/storage.js'
import { getHijriYear } from '../services/utility-service.js'

const selector = (state) => state.categories

export default function TextDrawer() {
  const Drawer = createDrawerNavigator()
  const { categories } = useSelector(selector)
  const dispatch = useDispatch()
  const versionAndHijriYear = `${packageJson.version} ` + getHijriYear()
  const [isDarkModeOn, setIsDarkModeOn] = React.useState(true)
  const theme = useTheme()

  const style = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      flex: 1
    },
    darkLightMode: {
      bottom: 75,
      left: 0,
      margin: 15,
      position: 'absolute'
    },
    darkModeLabel: {
      bottom: 50,
      color: theme.colors.onSurfaceVariant,
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
      bottom: 15,
      color: theme.colors.onSurfaceVariant,
      left: 0,
      margin: 15,
      position: 'absolute'
    }
  })

  React.useEffect(() => {
    getDarkMode()
  }, [])

  const storeDarkMode = async (value) => {
    const boolValuesForDarkMode = value === true ? 'on' : 'off'

    await storeData('isDarkModeOn', boolValuesForDarkMode)
    dispatch({ type: 'SET_DARK_MODE', payload: !value })
  }

  const getDarkMode = async () => {
    const value = await getData('isDarkModeOn')

    setIsDarkModeOn(value === 'on')
  }

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
    const { navigation } = props // Destructure the navigation prop

    return (
      <View style={style.container}>
        <DrawerContentScrollView {...props}>
          <Image source={icon} style={style.icon} />
          <Text style={style.title} variant="headlineSmall">
            {packageJson.displayName}
          </Text>
          <DrawerItemList {...props} />
          <Divider style={style.divider} />
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text
              style={{ marginLeft: 10, marginTop: 10, paddingLeft: 9, color: theme.colors.outline }}
              variant="labelLarge"
            >
              About
            </Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
        <View style={{ backgroundColor: theme.colors.surface }}>
          <Text style={style.darkModeLabel}>Dark Mode</Text>
          <Switch
            value={isDarkModeOn}
            style={style.darkLightMode}
            onValueChange={(value) => {
              storeDarkMode(value)
              setIsDarkModeOn(value)
            }}
          />
        </View>
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
      options={{
        title: SCREENS.home,
        headerShown: true,
        drawerLabel: 'All Texts'
      }}
      key={'999'}
    />
  )

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        backgroundColor: theme.colors.surface,
        drawerStyle: {
          width: 210
        },
        headerTintColor: theme.colors.secondary,
        headerStyle: {
          backgroundColor: theme.colors.background
        },
        headerTitleStyle: {
          fontFamily: 'philosopher',
          fontSize: 23,
          color: theme.colors.onSurface
        }
      }}
    >
      {homeScreen}
      {categoryItems}
    </Drawer.Navigator>
  )
}
