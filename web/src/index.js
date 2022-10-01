import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './app.js'
import { Auth0Provider } from '@auth0/auth0-react'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import darkTheme from './dark-theme.js'
import store from './redux/store.js'

const container = document.querySelector('#root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7yb6kp7f.eu.auth0.com"
      clientId="qMfwZdOKxHHnPwPLQturQ9LB4x2OAEKX"
      redirectUri={window.location.origin}
      useRefreshTokens={true}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
)
