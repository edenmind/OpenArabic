import { Container, Typography } from '@mui/material'

import Nav from './Nav'
import React from 'react'

const Home = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Home</h2>
        <Typography>Welcome Home!</Typography>
      </Container>
    </React.Fragment>
  )
}

export default Home
