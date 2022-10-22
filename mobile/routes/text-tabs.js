import React, { Fragment, useEffect, useState } from 'react'
import COLORS from '../constants/colors.js'
import PropTypes from 'prop-types'
import Quiz from '../screens/text-quiz.js'
import SCREENS from '../constants/screens.js'
import Spinner from '../components/spinner.js'
import { StyleSheet, Platform } from 'react-native'
import TextArabic from '../screens/text-arabic.js'
import TextBilingual from '../screens/text-bilingual.js'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getText } from '../services/api-service.js'
import { useDispatch } from 'react-redux'

const style = StyleSheet.create({
  tabs: {
    marginBottom: Platform.OS === 'ios' ? -75 : 0 //This is a hack to fix a bug in react-navigation
    //maxHeight: 550 // TODO: This is a hack to fix the tab bar height on Android
  }
})

export default function TextTabs({ route }) {
  const Tab = createMaterialTopTabNavigator()

  const { id } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const tabArray = [
    { name: SCREENS.bilingual, component: TextBilingual },
    { name: SCREENS.arabic, component: TextArabic },
    { name: SCREENS.quiz, component: Quiz }
  ]

  useEffect(() => {
    dispatch(getText(id))
    setIsLoading(false)
  }, [dispatch, id])

  const tabs = tabArray.map((screen) => (
    <Tab.Screen name={screen.name} component={screen.component} initialParams={{ id }} key={screen.name} />
  ))

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Tab.Navigator
        style={style.tabs}
        screenOptions={{
          tabBarActiveTintColor: COLORS.darkOlive,
          tabBarInactiveTintColor: COLORS.branch,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
            textTransform: 'none'
          }
        }}
      >
        {tabs}
      </Tab.Navigator>
    </Fragment>
  )
}

TextTabs.propTypes = {
  route: PropTypes.any.isRequired
}
