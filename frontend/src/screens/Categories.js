import { Container } from '@mui/material'
import Nav from './Nav'
import React from 'react'

export const Categories = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Categories</h2>
      </Container>
    </React.Fragment>
  )
}
