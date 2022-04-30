import React, { Fragment } from 'react'

import { Container } from '@mui/material'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import TextList from './TextList'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { id } = useParams()

  const heading = <Fragment>Welcome 👋🏻👋🏽👋🏿</Fragment>
  const subHeading = (
    <Fragment>
      Let's start learning classical arabic, <em>inshāʾAllāh</em> 🚀'
      <br />
      <br />
    </Fragment>
  )

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <TextList id={id} heading={heading} subHeading={subHeading} />
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Home
