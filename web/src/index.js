import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './app.js'
import { Auth0Provider } from '@auth0/auth0-react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import darkTheme from './dark-theme.js'
import store from './redux/store.js'

Bugsnag.start({
  apiKey: '073140fd83c45ec2f77c137264e12720',
  plugins: [new BugsnagPluginReact()]
})

const container = document.querySelector('#root')
const root = createRoot(container)
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-7yb6kp7f.eu.auth0.com"
      clientId="qMfwZdOKxHHnPwPLQturQ9LB4x2OAEKX"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
)
