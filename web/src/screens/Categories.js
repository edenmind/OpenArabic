import { Container } from '@mui/material'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import React from 'react'
import TextCard from './TextListCard'
import { useParams } from 'react-router-dom'

const Categories = () => {
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

export default Categories
