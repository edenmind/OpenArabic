/* eslint-disable react/react-in-jsx-scope */
import React, { Fragment } from 'react'

import { Container } from '@mui/material'
import Footer from '../components/footer'
import Nav from '../components/nav'
import TextList from './text-list'
import { useParams } from 'react-router-dom'

const Home = () => {
  const { id } = useParams()

  const heading = id ? (
    <Fragment>
      <h3>{id}</h3>
    </Fragment>
  ) : (
    <Fragment>Welcome 👋🏻👋🏽👋🏿</Fragment>
  )
  const subHeading = id ? (
    <Fragment />
  ) : (
    <Fragment>
      Let us start learning classical arabic, <em>inshāʾAllāh</em> 🚀`
      <br />
      <br />
    </Fragment>
  )

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <TextList id={id} heading={heading} subHeading={subHeading} />
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Home
