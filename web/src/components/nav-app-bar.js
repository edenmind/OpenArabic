import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import LoginButton from './login-button.js'
import LogoutButton from './logout-button.js'
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
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/">
            <h3>OpenArabic</h3>
          </Button>
        </Typography>
        <Button component={Link} to="/about">
          About
        </Button>

        <Button component={Link} to="/privacy">
          Privacy
        </Button>

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
