import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useDispatch } from 'react-redux'
import SCREENS from '../constants/screens.js'
import Spinner from '../components/spinner.js'
import TextArabic from '../screens/text-arabic.js'
import TextBilingual from '../screens/text-bilingual.js'
import OrderingWordsInASentence from '../screens/text-practice.js'
import { getText } from '../services/api-service.js'

const Tab = createMaterialTopTabNavigator()

export default function TextTabs({ route }) {
  const dispatch = useDispatch()
  const { id } = route.params
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchText = async () => {
      await dispatch(getText(id))
      setIsLoading(false)
    }
    fetchText()
  }, [dispatch, id])

  const tabs = [
    { name: SCREENS.bilingual, component: TextBilingual },
    { name: SCREENS.arabic, component: TextArabic },
    { name: SCREENS.quiz, component: OrderingWordsInASentence }
  ]

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                textTransform: 'none'
              }
            }}
          >
            {tabs.map((screen) => (
              <Tab.Screen key={screen.name} name={screen.name} component={screen.component} initialParams={{ id }} />
            ))}
          </Tab.Navigator>
        </Fragment>
      )}
    </>
  )
}

TextTabs.propTypes = {
  route: PropTypes.object.isRequired
}
