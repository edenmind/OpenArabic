import React from 'react'
import PAPERTHEME from './constants/paper-theme.js'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import Root from './routes/root.js'
import { store } from './redux/store.js'

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={PAPERTHEME}>
        <Root />
      </PaperProvider>
    </Provider>
  )
}
