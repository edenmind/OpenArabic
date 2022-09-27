import * as React from 'react'
import Box from '@mui/material/Box'
import NavAppBar from './nav-app-bar.js'
import NavDrawer from './nav-drawer.js'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const [state, setState] = React.useState({
    left: false
  })

  const { isAuthenticated } = useAuth0()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavDrawer isAuthenticated={isAuthenticated} toggleDrawer={toggleDrawer} state={state} />
      <NavAppBar isAuthenticated={isAuthenticated} toggleDrawer={toggleDrawer} />
    </Box>
  )
}

export default Nav
