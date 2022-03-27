import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

export default function Home() {
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
    <Box sx={{ width: 250 }} role='presentation' onClick={toggleDrawer('left', false)} onKeyDown={toggleDrawer('left', false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
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
