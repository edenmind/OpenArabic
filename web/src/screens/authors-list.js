import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function AuthorsList(properties) {
  return properties.authors.map((author, index) => (
    <Fragment key={index}>
      <Card sx={{ minWidth: 275 }} key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Sunni Scholar
          </Typography>
          <Typography variant="h5" component="div">
            {author.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Placeholder
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/authors/update/${author.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small" onClick={() => properties.handleClickOpen(author)}>
            Delete
          </Button>
        </CardActions>
        <Divider />
      </Card>
    </Fragment>
  ))
}

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  handleClickOpen: PropTypes.func.isRequired
}

export default AuthorsList
