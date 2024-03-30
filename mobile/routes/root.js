import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Text from './text.js'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../constants/paper-theme.js'

const darkModeSelector = (state) => state.isDarkMode

function Root() {
  const isDarkMode = useSelector(darkModeSelector)
  const theme = isDarkMode.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Text />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default Root
