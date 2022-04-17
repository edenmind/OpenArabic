import React, { Fragment, useEffect, useState } from 'react'

import AppPromo from '../../../components/AppPromo'
import PropTypes from 'prop-types'
import Quiz from './Quiz'
import { SCREENS } from '../../../constants/screens'
import Spinner from '../../../components/Spinner'
/* eslint-disable import/namespace */
import { StyleSheet } from 'react-native'
import TextArabic from './TextArabic'
import TextBilingual from './TextBilingual'
import TextEnglish from './TextEnglish'
import TextRelated from './TextRelated'
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

  const { textId = {} } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const tabArray = [
    { name: SCREENS.bilingual, component: TextBilingual }
    // { name: SCREENS.quiz, component: Quiz },
    // { name: SCREENS.arabic, component: TextArabic },
    // { name: SCREENS.english, component: TextEnglish },
    // { name: SCREENS.related, component: TextRelated }
  ]

  useEffect(() => {
    const fetchText = () => {
      dispatch(getText(textId))
      setTimeout(() => {
        setIsLoading(false)
      }, 700)
    }
    fetchText()
  }, [dispatch, textId])

  const tabs = tabArray.map((screen) => (
    <Tab.Screen
      name={screen.name}
      component={screen.component}
      initialParams={{ textId }}
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
