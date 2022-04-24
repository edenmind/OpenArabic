import React, { useEffect } from 'react'
import { events, track } from './services/Analytics'

import { PAPERTHEME } from './constants/paperTheme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import Root from './routes/Root'
import { store } from './redux/store'

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
