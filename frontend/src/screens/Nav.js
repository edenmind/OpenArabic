import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Nav() {
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = () => (
    <React.Fragment>
      <Divider>Administration</Divider>
      <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}>
        <List>
          {['Texts', 'Categories', 'Authors'].map((text, index) => (
            <ListItem key={index}>
              <Button href={text} variant='text' key={index}>
                {text}
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
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            OpenArabic
          </Typography>

          <Button color='inherit' href='/'>
            Home
          </Button>

          <Button color='inherit' href='/contact'>
            Contact
          </Button>

          <Button color='inherit' href='/about'>
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
        {list()}
      </Drawer>
    </Box>
  )
}
