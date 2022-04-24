/* eslint-disable import/namespace */
import React, { Fragment, useEffect, useState } from 'react'

import { COLORS } from '../constants/colors'
import PropTypes from 'prop-types'
import Quiz from '../screens/TextQuiz'
import { SCREENS } from '../constants/screens'
import Spinner from '../components/Spinner'
import { StyleSheet } from 'react-native'
import TextArabic from '../screens/TextArabic'
import TextBilingual from '../screens/TextBilingual'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getText } from '../services/ApiService'
import { useDispatch } from 'react-redux'

const style = StyleSheet.create({
  tabs: {
    paddingTop: 0
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
    <Tab.Screen
      name={screen.name}
      component={screen.component}
      initialParams={{ id }}
      key={screen.name}
    />
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
        }}>
        {tabs}
      </Tab.Navigator>
    </Fragment>
  )
}

TextTabs.propTypes = {
  route: PropTypes.any.isRequired
}
