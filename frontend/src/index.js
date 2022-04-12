import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import darkTheme from './darkTheme'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
