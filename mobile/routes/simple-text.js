import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import { UIElements } from '../constants/ui.js'
import TextBilingual from '../screens/text-bilingual.js'
import { getText } from '../services/api-service.js'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

export default function SimpleText({ route }) {
  const isDarkModeOn = useSelector(darkModeSelector)
  const theme = useTheme()

  const dispatch = useDispatch()

  const { id } = route.params

  useEffect(() => {
    const fetchText = async () => {
      dispatch(getText(id))
    }
    fetchText()
  }, [dispatch, id])

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textBilingual}
          component={TextBilingual}
          options={{
            headerLargeTitle: false,
            headerShown: false,
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDefaultTheme.colors.background
                : CombinedDarkTheme.colors.background
            },
            headerTitleStyle: {
              color: theme.colors.onSurface,
              fontFamily: 'philosopher',
              fontSize: UIElements.TitleFont
            },
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

SimpleText.propTypes = {
  route: PropTypes.object
}
