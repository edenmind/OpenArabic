import React from 'react'
import Nav from './Nav'
import TextProduction from './TextProduction'
import { Container } from '@mui/material'

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
