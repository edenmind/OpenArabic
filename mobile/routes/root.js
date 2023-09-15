import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Text from './text.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'

const darkModeSelector = (state) => state.isDarkMode

function Root() {
  const isDarkModeOn = useSelector(darkModeSelector)

  return (
    <PaperProvider theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
      <NavigationContainer theme={isDarkModeOn.isDarkMode ? CombinedDefaultTheme : CombinedDarkTheme}>
        <Text />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Root
