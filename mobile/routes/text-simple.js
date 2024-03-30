import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'
import SCREENS from '../constants/screens.js'
import { UIElements } from '../constants/ui.js'
import TextSetupPractice from '../screens/text-practice-setup.js'
import { getText } from '../services/api-service.js'

const Stack = createNativeStackNavigator()
const darkModeSelector = (state) => state.isDarkMode

export default function TextSimple({ route, navigation }) {
  const isDarkModeOn = useSelector(darkModeSelector)
  const theme = useTheme()

  const dispatch = useDispatch()

  const { id } = route.params

  function TextSetupComponent() {
    return <TextSetupPractice navigation={navigation} />
  }

  useEffect(() => {
    const fetchText = async () => {
      dispatch(getText(id))
    }
    fetchText()
  }, [dispatch, id])

  return (
    <NavigationContainer independent theme={isDarkModeOn.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.textBilingual}
          component={TextSetupComponent}
          options={{
            headerLargeTitle: false,
            headerShown: false,
            headerStyle: {
              backgroundColor: isDarkModeOn.isDarkMode
                ? CombinedDarkTheme.colors.background
                : CombinedDefaultTheme.colors.background
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

TextSimple.propTypes = {
  route: PropTypes.object,
  // eslint-disable-next-line sort-keys
  navigation: PropTypes.object
}
