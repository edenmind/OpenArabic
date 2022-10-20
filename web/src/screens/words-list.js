import { Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function WordsList(properties) {
  return properties.Words.map((word, index) => (
    <Fragment key={index}>
      <Card sx={{ minWidth: 275 }} key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Sunni Scholar
          </Typography>
          <Typography variant="h5" component="div">
            {word.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Placeholder
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/Words/update/${word.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small" onClick={() => properties.handleClickOpen(word)}>
            Delete
          </Button>
        </CardActions>
        <Divider />
      </Card>
    </Fragment>
  ))
}

export default WordsList
