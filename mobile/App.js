import React, { useEffect } from 'react'
import { events, track } from './services/analytics.js'
import PAPERTHEME from './constants/paper-theme.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import Root from './routes/root.js'
import { store } from './redux/store.js'

export default function App() {
  useEffect(() => {
    track(events.HOME)
  }, [])

  return (
    <Provider store={store}>
      <PaperProvider theme={PAPERTHEME}>
        <Root />
      </PaperProvider>
    </Provider>
  )
}
