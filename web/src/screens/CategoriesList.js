/* eslint-disable react/react-in-jsx-scope */
import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function CategoriesList(properties) {
  return properties.category.map((c, index) => (
    <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Placeholder
        </Typography>
        <Typography variant="h5" component="div">
          {c.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Placeholder
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/categories/update/${c.id}`}>
          <Button size="small">Edit</Button>
        </Link>
        <Button size="small" onClick={() => properties.handleClickOpen(c)}>
          Delete
        </Button>
      </CardActions>
      <Divider />
    </Card>
  ))
}

CategoriesList.propTypes = {
  category: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  handleClickOpen: PropTypes.func.isRequired
}

export default CategoriesList
