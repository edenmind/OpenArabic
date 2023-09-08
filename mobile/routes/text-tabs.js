import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Spinner from '../components/spinner.js'
import SCREENS from '../constants/screens.js'
import TextBilingual from '../screens/text-bilingual.js'
import OrderingWordsInASentence from '../screens/text-practice.js'
import { getText } from '../services/api-service.js'
const Tab = createMaterialTopTabNavigator()

export default function TextTabs({ route }) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { id } = route.params
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchText = async () => {
      dispatch(getText(id))
      setIsLoading(false)
    }
    fetchText()
  }, [dispatch, id])

  const tabs = [
    { name: SCREENS.bilingual, component: TextBilingual },
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
                fontSize: 15,
                fontWeight: 'bold',
                textTransform: 'none'
              },
              tabBarStyle: {
                backgroundColor: theme.colors.background
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
