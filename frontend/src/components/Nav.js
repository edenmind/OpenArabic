import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import { Fragment } from 'react'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

export default function Nav() {
  const [state, setState] = React.useState({
    left: false,
  })

  const [categories, setCategories] = React.useState([])
  const { user, isAuthenticated } = useAuth0()

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const list = () => (
    <React.Fragment>
      <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}>
        {isAuthenticated && user.email === 'jonas@lightgate-imagery.com' && (
          <Fragment>
            <Divider>Administration</Divider>
            <List>
              {['Texts', 'Categories', 'Authors'].map((item, index) => (
                <ListItem key={index}>
                  <Link to={`/${item}`}>
                    <Button variant='text'>{item}</Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
        <Divider />
        <List>
          {categories.map((category, index) => (
            <ListItem key={index}>
              <Button href={`/texts/categories/${category.id}`} variant='text' key={index}>
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </React.Fragment>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer('left', true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography component='div' sx={{ flexGrow: 1 }}>
            <Button href={'/'} variant='text'>
              OpenArabic
            </Button>
          </Typography>

          <Link to='/about'>
            <Button variant='text'>About</Button>
          </Link>

          <Link to='/privacy'>
            <Button variant='text'>Privacy</Button>
          </Link>

          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
        {list()}
      </Drawer>
    </Box>
  )
}
