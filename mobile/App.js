/* eslint-disable unicorn/filename-case */
import Bugsnag from '@bugsnag/expo'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import ErrorBoundary from 'react-native-error-boundary'
import { Provider } from 'react-redux'

import { store } from './redux/store.js'
import Root from './routes/root.js'

Bugsnag.start({
  apiKey: '77c30e82c802aed265d4d31617059924'
})

export default function App() {
  const [fontsLoaded] = useFonts({
    amiri: require('./assets/fonts/amiri.ttf'),
    indopak: require('./assets/fonts/indopak.ttf'),
    noto: require('./assets/fonts/noto.ttf'),
    philosopher: require('./assets/fonts/philosopher.ttf'),
    uthman: require('./assets/fonts/uthman.otf')
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
