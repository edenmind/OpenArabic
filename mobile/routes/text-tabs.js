import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Quiz from '../screens/text-quiz.js'
import SCREENS from '../constants/screens.js'
import Spinner from '../components/spinner.js'
import TextArabic from '../screens/text-arabic.js'
import TextBilingual from '../screens/text-bilingual.js'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { getText } from '../services/api-service.js'
import { useDispatch } from 'react-redux'

export default function TextTabs({ route }) {
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
    <Tab.Screen name={screen.name} component={screen.component} initialParams={{ id }} key={screen.name} />
  ))

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Tab.Navigator
        screenOptions={{
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
