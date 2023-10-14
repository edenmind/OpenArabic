import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const getLevelName = (level) => {
  switch (level) {
    case '10': {
      return 'Introduction'
    }
    case '20': {
      return 'Intermediate'
    }
    case '30': {
      return 'Advanced'
    }
    default: {
      return 'Unknown'
    }
  }
}

function CategoriesList(properties) {
  return properties.category.map((c, index) => (
    <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {getLevelName(c.level)}
        </Typography>
        <Typography variant="h5" component="div">
          {c.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {c.description}
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
  category: PropTypes.array.isRequired,
  handleClickOpen: PropTypes.func.isRequired
}

export default CategoriesList
