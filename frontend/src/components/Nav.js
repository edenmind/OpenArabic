import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { Link } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import axios from 'axios'

export default function Nav() {
  const [state, setState] = React.useState({
    left: false,
  })

  const [categories, setCategories] = React.useState([])

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
        <Divider>Administration</Divider>
        <List>
          {['Texts', 'Categories', 'Authors'].map((text, index) => (
            <ListItem key={index}>
              <Button href={text} variant='text' key={index}>
                {text}
              </Button>
            </ListItem>
          ))}
        </List>
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
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link href='/' style={{ textDecoration: 'none' }}>
              OpenArabic
            </Link>
          </Typography>

          <Button color='inherit' href='/contact'>
            Contact
          </Button>

          <Button color='inherit' href='/about'>
            About
          </Button>

          <Button color='inherit' href='/privacy'>
            Privacy
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'left'} open={state.left} onClose={toggleDrawer('left', false)}>
        {list()}
      </Drawer>
    </Box>
  )
}
