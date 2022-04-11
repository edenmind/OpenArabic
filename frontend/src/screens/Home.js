import { Container, Typography } from '@mui/material'

import Nav from '../components/Nav'
import React from 'react'

const Home = () => (
  <React.Fragment>
    <Nav />
    <Container maxWidth='lg'>
      <h2>Home</h2>
      <Typography>Welcome Home!</Typography>
    </Container>
  </React.Fragment>
)

export default Home
