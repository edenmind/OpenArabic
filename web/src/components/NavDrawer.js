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
      .catch((err) => console.log(err))
  }, [])

  return (
    <Drawer anchor={'left'} open={props.state.left} onClose={props.toggleDrawer('left', false)}>
      <Box sx={{ width: 250 }} role='presentation' onClick={props.toggleDrawer('left', false)} onKeyDown={props.toggleDrawer('left', false)}>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index}>
              <Link to={`/texts/categories/${category.id}`}>
                <Button variant='text'>{category.name}</Button>
              </Link>
            </ListItem>
          ))}
        </List>

        {props.isAuthenticated && (
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
      </Box>
    </Drawer>
  )
}

NavDrawer.propTypes = {
  isAuthenticated: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
}

export default NavDrawer
