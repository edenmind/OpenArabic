import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'

import Nav from './Nav'
import React from 'react'
import axios from 'axios'

export const Authors = () => {
  const [authors, setAuthors] = React.useState([])

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/authors')
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteAuthor = (id) => {
    axios
      .delete(`http://localhost:3000/authors/${id}`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
  }

  const authorsList = authors.map((author, index) => (
    <Card sx={{ minWidth: 275 }} key={index}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Sunni Scholar
        </Typography>
        <Typography variant='h5' component='div'>
          {author.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          Placeholder
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Edit</Button>
        <Button size='small' onClick={() => deleteAuthor(author._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  ))

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Authors</h2>
        {authorsList}
      </Container>
    </React.Fragment>
  )
}
