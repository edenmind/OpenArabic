import React, { Fragment } from 'react'
import { Container } from '@mui/material'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import TextList from './text-list.js'
import { useParams } from 'react-router-dom'

const Home = () => {
  //get the text id from the url
  const { id } = useParams()

  //check if id is set which means that we are viewing a category
  const isCategory = id !== undefined

  //produce heading based on whether we are viewing a category or not
  const heading = isCategory ? (
    <Fragment>
      <h3>{id}</h3>
    </Fragment>
  ) : (
    <Fragment>Welcome 👋🏻👋🏽👋🏿</Fragment>
  )

  //produce subHeading based on whether we are viewing a category or not
  const subHeading = isCategory ? (
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
