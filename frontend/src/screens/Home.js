import { Container } from '@mui/material'
import Nav from './Nav'
import React from 'react'
import TextProduction from './TextProduction'

const Home = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Add Text</h2>
        <TextProduction />
      </Container>
    </React.Fragment>
  )
}

export default Home
