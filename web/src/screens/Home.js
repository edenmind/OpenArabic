import React, { Fragment } from 'react'

import { Container } from '@mui/material'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import TextCard from './TextListCard'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { id } = useParams()

  const heading = <Fragment>Welcome 👋🏻👋🏽👋🏿</Fragment>
  const subHeading = (
    <Fragment>
      Lets start learning classical arabic, <em>inshāʾAllāh</em> 🚀'
      <br />
      <br />
    </Fragment>
  )

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <TextCard id={id} heading={heading} subHeading={subHeading} />
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Home
