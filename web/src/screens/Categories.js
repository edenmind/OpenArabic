import React, { Fragment } from 'react'

import { Container } from '@mui/material'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import TextCard from './TextCard'
import { useParams } from 'react-router-dom'

export const Categories = () => {
  const { id } = useParams()

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <TextCard id={id} />
        <Footer />
      </Container>
    </React.Fragment>
  )
}
