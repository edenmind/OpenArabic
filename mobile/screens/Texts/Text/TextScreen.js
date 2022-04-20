/* eslint-disable import/namespace */
import React, { Fragment, useEffect, useState } from 'react'

import AppPromo from '../../../components/AppPromo'
import PropTypes from 'prop-types'
import Quiz from './Quiz'
import { SCREENS } from '../../../constants/screens'
import Spinner from '../../../components/Spinner'
import { StyleSheet } from 'react-native'
import TextArabic from './TextArabic'
import TextBilingual from './TextBilingual'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getText } from '../../../services/ApiService'
import { useDispatch } from 'react-redux'

const style = StyleSheet.create({
  tabs: {
    paddingTop: 0
  }
})
export default function TextScreen({ route }) {
  const Tab = createMaterialTopTabNavigator()

  const { id } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const tabArray = [
    { name: SCREENS.bilingual, component: TextBilingual },
    { name: SCREENS.quiz, component: Quiz },
    { name: SCREENS.arabic, component: TextArabic }
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
          tabBarLabelStyle: { fontSize: 12 }
        }}>
        {tabs}
      </Tab.Navigator>
      <AppPromo />
    </Fragment>
  )
}

TextScreen.propTypes = {
  route: PropTypes.any.isRequired
}
