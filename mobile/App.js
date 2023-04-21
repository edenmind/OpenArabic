/* eslint-disable unicorn/filename-case */
import Bugsnag from '@bugsnag/expo'
import ErrorBoundary from 'react-native-error-boundary'

import { Provider } from 'react-redux'
import React, { useCallback } from 'react'
import Root from './routes/root.js'
import { store } from './redux/store.js'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

Bugsnag.start({
  apiKey: '77c30e82c802aed265d4d31617059924'
})

export default function App() {
  const [fontsLoaded] = useFonts({
    amiri: require('./assets/fonts/amiri.ttf'),
    indopak: require('./assets/fonts/indopak.ttf'),
    noto: require('./assets/fonts/noto.ttf'),
    uthman: require('./assets/fonts/uthman.otf'),
    philosopher: require('./assets/fonts/philosopher.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Root onLayout={onLayoutRootView} />
      </Provider>
    </ErrorBoundary>
  )
}
