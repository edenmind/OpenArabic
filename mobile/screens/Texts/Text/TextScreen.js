import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TextBilingual from './TextBilingual'
import TextEnglish from './TextEnglish'
import TextArabic from './TextArabic'
import TextRelated from './TextRelated'
import { useDispatch } from 'react-redux'
import { getText } from '../../../services/ApiService'
import Spinner from '../../../components/Spinner'
import AppPromo from '../../../components/AppPromo'
import { SCREENS } from '../../../constants/screens'

export default function TextScreen({ route }) {
  const Tab = createMaterialTopTabNavigator()

  const { textId = {} } = route.params
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const tabArray = [
    { name: SCREENS.bilingual, component: TextBilingual },
    { name: SCREENS.arabic, component: TextArabic },
    { name: SCREENS.english, component: TextEnglish },
    { name: SCREENS.related, component: TextRelated }
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

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <Fragment>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 }
          }}>
          {tabs}
        </Tab.Navigator>
        <AppPromo />
      </Fragment>
    )
  }
}

TextScreen.propTypes = {
  route: PropTypes.any.isRequired
}
