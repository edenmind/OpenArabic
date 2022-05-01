/* eslint-disable react/react-in-jsx-scope */
import * as wordProcessing from '../services/wordProcessing'

import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function TextListCard(properties) {
  return properties.texts
    .filter((order) => order.status !== 'Draft')
    .map((text, index) => (
      <Grid item md={4} xs={12} key={index}>
        <Card>
          <CardMedia component="img" height="194" image={`/${index}.png`} />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {text.category}
            </Typography>
            <Typography variant="h5" component="div">
              {text.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {text.author}
            </Typography>
            <div dir="rtl">
              <Typography variant="h5">{wordProcessing.truncateString(text.sentences)}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Link to={`/texts/${text.id}`}>
              <Button size="small">Read More</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    ))
}

TextListCard.propTypes = {
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TextListCard
