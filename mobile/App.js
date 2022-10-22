/* eslint-disable unicorn/filename-case */
import Bugsnag from '@bugsnag/expo'
import ErrorBoundary from 'react-native-error-boundary'
import PAPERTHEME from './constants/paper-theme.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import React from 'react'
import Root from './routes/root.js'
import { store } from './redux/store.js'

Bugsnag.start({
  apiKey: '77c30e82c802aed265d4d31617059924'
})

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={PAPERTHEME}>
          <Root />
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  )
}
