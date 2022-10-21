import * as React from 'react'

import { Box, Button, Divider, Drawer, List, ListItem } from '@mui/material'

import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

function NavDrawer(props) {
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Drawer anchor={'left'} open={props.state.left} onClose={props.toggleDrawer('left', false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={props.toggleDrawer('left', false)}
        onKeyDown={props.toggleDrawer('left', false)}
      >
        <List>
          {categories.map((category, index) => (
            <ListItem key={index}>
              <Button component={Link} to={`/texts/categories/${category.name}`}>
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>

        {props.isAuthenticated && (
          <Fragment>
            <Divider>Administration</Divider>
            <List>
              {['Categories', 'Authors', 'Texts', 'Words'].map((item, index) => (
                <ListItem key={index}>
                  <Button component={Link} to={`/${item}`}>
                    {item}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
      </Box>
    </Drawer>
  )
}

NavDrawer.propTypes = {
  isAuthenticated: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
}

export default NavDrawer
