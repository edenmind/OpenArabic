/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable unicorn/prevent-abbreviations */

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import LoginButton from './login-button'
import LogoutButton from './logout-button'
import MenuIcon from '@mui/icons-material/Menu'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function NavAppBar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.toggleDrawer('left', true)}
          sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Button variant="text">
              <h3>OpenArabic</h3>
            </Button>
          </Link>
        </Typography>

        <Link to="/about">
          <Button variant="text">About</Button>
        </Link>

        <Link to="/privacy">
          <Button variant="text">Privacy</Button>
        </Link>

        {!props.isAuthenticated && <LoginButton />}
        {props.isAuthenticated && <LogoutButton />}
      </Toolbar>
    </AppBar>
  )
}

NavAppBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired
}

export default NavAppBar
