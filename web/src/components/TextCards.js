import * as wordProcessing from '../services/wordProcessing'

import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'

const TextCards = (props) => {
  const { isAuthenticated } = useAuth0()

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }))

  const cards = props.texts.slice(0, 6).map((text, index) => (
    <Grid item md={4} xs={12} key={index}>
      <Item>
        <Card>
          <CardMedia component='img' height='194' image={`/${index}.png`} />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {text.category}
            </Typography>
            <Typography variant='h5' component='div'>
              {text.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {text.author}
            </Typography>
            <div dir='rtl'>
              <Typography variant='h5'>{wordProcessing.truncateString(text.sentences)}</Typography>
            </div>
          </CardContent>
          <CardActions>
            <Link to={`/texts/${text._id}`}>
              <Button size='small'>Read More</Button>
            </Link>
            {isAuthenticated && (
              <Button size='small' onClick={() => props.handleDeleteClick(text._id)}>
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Item>
    </Grid>
  ))

  return (
    <Fragment>
      <h2>{props.heading}</h2>
      <h4>{props.subheading}</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </Box>
    </Fragment>
  )
}

TextCards.propTypes = {
  texts: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
}

export default TextCards
