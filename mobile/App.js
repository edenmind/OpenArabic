import React from 'react'
import PAPERTHEME from './constants/paper-theme.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import Root from './routes/root.js'
import { store } from './redux/store.js'
import * as Sentry from 'sentry-expo'
import ErrorBoundary from 'react-native-error-boundary'

export default function App() {
  Sentry.init({
    dsn: 'https://5c02aed50b5d40d198688b1aa145cf29@o1414696.ingest.sentry.io/6755037',
    enableInExpoDevelopment: true
  })

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
